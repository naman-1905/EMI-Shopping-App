# EMI Shopping App - CI/CD Pipeline Documentation

## Overview

This document describes the complete CI/CD pipeline for the EMI Shopping App, which uses Jenkins for orchestration, Docker for containerization, and Kubernetes for deployment.

## Architecture

```
┌─────────────┐
│   GitHub    │
└──────┬──────┘
       │
       v
┌─────────────────────────────────────┐
│         Jenkins Pipeline            │
│  (Parameterized, Multi-Component)   │
└─────────────────────────────────────┘
       │
       ├─► Frontend Build & Push
       ├─► Backend Build & Push
       └─► Kubernetes Deployment
```

## Pipeline Parameters

When running the Jenkins pipeline, you'll be prompted to select:

### 1. **COMPONENT** - What to Build
- `frontend` - Build and deploy only the frontend
- `backend` - Build and deploy only the backend
- `both` - Build and deploy both frontend and backend

### 2. **DEPLOY_NODE** - Deployment Target
- `naman` - Deploy to Naman's Kubernetes cluster (`/home/jenkins/.kubenaman/config`)
- `kahitoz` - Deploy to Kahitoz's Kubernetes cluster (`/home/jenkins/.kubekahitoz/config`)

### 3. **GIT_BRANCH** - Git Branch (Optional)
- Default: `deployment/CICD-Config-Files`
- Can be overridden to deploy from different branches

### 4. **SKIP_TESTS** - Skip Testing (Optional)
- Default: `false`
- Set to `true` to skip tests and go directly to build

## Pipeline Stages

### Stage 1: Initialize
Displays pipeline configuration and environment variables.

### Stage 2: Checkout SCM
Clones the repository from GitHub using the specified branch.

### Stage 3: Cleanup
Removes old containers and cleans the workspace.

### Stage 4: Backend Build & Push (Conditional)
Executed only if `COMPONENT` is `backend` or `both`:
1. **Load Backend Environment** - Loads `.env` file from Jenkins credentials (`backend_env`)
2. **Tag Pipeline** - Tags the build as `backend_build-{BUILD_NUMBER}`
3. **Build Docker Image** - Creates Docker image with tag `{BUILD_NUMBER}-{BUILD_TIMESTAMP}`
4. **Push to Registries**:
  - Registry 1 (Push): `registrypush.kahitoz.com:5000/emi_backend:latest`
  - Registry 2 (Pull): `registry.kahitoz.com/emi_backend:latest`

### Stage 5: Frontend Build & Push (Conditional)
Executed only if `COMPONENT` is `frontend` or `both`:
1. **Load Frontend Environment** - Loads `.env.local` file from Jenkins credentials (`frontend_env`)
2. **Tag Pipeline** - Tags the build as `frontend_build-{BUILD_NUMBER}`
3. **Build Docker Image** - Creates Docker image with tag `{BUILD_NUMBER}-{BUILD_TIMESTAMP}`
4. **Push to Registries**:
  - Registry 1 (Push): `registrypush.kahitoz.com:5000/emi_frontend:latest`
  - Registry 2 (Pull): `registry.kahitoz.com/emi_frontend:latest`

### Stage 6: Deploy Configuration
Configures Kubernetes deployment:
- Creates namespace `emi-shopping` if it doesn't exist
- If deployment exists: Performs rolling restart
- If deployment doesn't exist: Applies new deployment manifest
- Waits for deployment readiness (5-minute timeout)

### Stage 7: Cloudflared Configuration
Sets up Cloudflare tunnel for internet exposure:
- Creates/updates Kubernetes secret with cloudflared token
- Token is injected from Jenkins credentials (`cloudflared_token`)

### Stage 8: Pod Health Check
Verifies all 3 containers are running:
- ✓ Frontend container (port 3000)
- ✓ Backend container (port 3001)
- ✓ Cloudflared container (tunnel)

## Jenkins Credentials Required

Setup these credentials in Jenkins before running the pipeline:

### 1. Docker Registry Credentials
- **ID**: `docker_creds`
- **Type**: Username/Password
- **Usage**: Pushing images to both registries
- **Scope**: Global (System)

### 2. Backend Environment File
- **ID**: `backend_env`
- **Type**: Secret file
- **Content**: `.env` file with backend configuration
- **Scope**: System > emi-demo-app

### 3. Frontend Environment File
- **ID**: `frontend_env`
- **Type**: Secret file
- **Content**: `.env` file with frontend configuration (API endpoints, etc.)
- **Scope**: System > emi-demo-app

### 4. Cloudflared Token
- **ID**: `cloudflared_token`
- **Type**: Secret text
- **Content**: Cloudflare tunnel token
- **Scope**: System > emi-demo-app

### 5. GitHub Credentials (Optional)
- **ID**: `github_credentials`
- **Type**: Username/Password or SSH
- **Usage**: Private repository access if needed

## Docker Registries

### Registry 1 (Push Registry)
- **URL**: `registrypush.kahitoz.com:5000`
- **Purpose**: Push newly built images
- **Authentication**: Via `docker_creds`

### Registry 2 (Pull Registry)
- **URL**: `registry.kahitoz.com`
- **Purpose**: Pull images in Kubernetes deployment
- **Authentication**: Via Kubernetes ImagePullSecret (`docker-creds`)

## Kubernetes Deployment

### Namespace
- **Name**: `emi-shopping`

### Deployment
- **Name**: `emi-app-deployment`
- **Replicas**: 1 (scales 1-3 via HPA)
- **Strategy**: Rolling Update (maxSurge: 1, maxUnavailable: 0)

### Service
- **Name**: `emi-app-service`
- **Type**: LoadBalancer
- **Ports**:
  - 80 → Frontend:3000
  - 3001 → Backend:3001

### Containers (Single Pod, 3 Containers)

#### Frontend Container
- **Image**: `registry.kahitoz.com/emi_frontend:latest`
- **Port**: 3000
- **Resources**:
  - Request: 256Mi memory, 100m CPU
  - Limit: 512Mi memory, 500m CPU
- **Health Check**: HTTP GET `/` every 20s

#### Backend Container
- **Image**: `registry.kahitoz.com/emi_backend:latest`
- **Port**: 3001
- **Environment**: From `backend-env` secret
- **Resources**:
  - Request: 512Mi memory, 200m CPU
  - Limit: 1Gi memory, 1000m CPU
- **Health Check**: HTTP GET `/health` every 20s

#### Cloudflared Container
- **Image**: `cloudflare/cloudflared:latest`
- **Port**: 5572 (metrics)
- **Token**: From `cloudflared-token` secret
- **Resources**:
  - Request: 64Mi memory, 50m CPU
  - Limit: 256Mi memory, 250m CPU
- **Command**: Cloudflare tunnel with auto-update disabled

### Horizontal Pod Autoscaler (HPA)
- **Min Replicas**: 1
- **Max Replicas**: 3
- **CPU Threshold**: 70%
- **Memory Threshold**: 80%

## Docker Images

### Backend Dockerfile
- **Base Image**: `node:18-alpine`
- **Multi-stage**: Builder + Runtime
- **Optimizations**:
  - Uses `npm ci` for reproducible builds
  - Only copies `node_modules` from builder
  - Includes health check
  - Minimal final image size

### Frontend Dockerfile
- **Base Image**: `node:18-alpine`
- **Multi-stage**: Builder + Runtime
- **Build Process**:
  - Installs dependencies
  - Builds Next.js application
  - Copies `.next` directory to runtime stage
- **Optimizations**:
  - Includes health check
  - Minimal final image size

## Build Files (.dockerignore)

Both Dockerfiles exclude:
- `node_modules` - Reinstalled in container
- `build_stages/` - Groovy scripts (not needed in image)
- `README.md` - Documentation
- `sql/` - Database scripts (backend only)
- `.env` - Secrets (injected at runtime)
- `.git` - Git history
- Build artifacts (`.next`, `dist`, `coverage`, etc.)

## Environment Variables

### Backend
Loaded from Jenkins credential `backend_env`:
- Database connection strings
- API keys
- Third-party service credentials
- Feature flags

### Frontend
Loaded from Jenkins credential `frontend_env`:
- `NEXT_PUBLIC_API_URL` - Backend API endpoint
- `NEXT_PUBLIC_*` - Public variables (prefixed for Next.js)
- Analytics keys
- Feature flags

### Cloudflared
- `CLOUDFLARED_TOKEN` - Tunnel authentication token
- `TZ` - Timezone (UTC)

## Build Stages Structure

### Root Build Stages (`build_stages/`)
- `checkout_scm.groovy` - Clone repository
- `cleanup.groovy` - Clean workspace and containers
- `cloudflared_token.groovy` - Setup Cloudflare tunnel secret
- `configure_deployment.groovy` - Create/update Kubernetes deployment
- `podcheck.groovy` - Verify all containers are running

### Backend Build Stages (`backend/build_stages/`)
- `build_docker_image.groovy` - Build backend Docker image
- `load_backend_env.groovy` - Load backend environment from Jenkins
- `push_docker_image.groovy` - Push image to both registries
- `tag_pipeline.groovy` - Tag build for tracking

### Frontend Build Stages (`frontend/build_stages/`)
- `buid_docker_image.groovy` - Build frontend Docker image
- `load_frontend_env.groovy` - Load frontend environment from Jenkins
- `push_docker_image.groovy` - Push image to both registries
- `tag_pipeline.groovy` - Tag build for tracking

## Usage Examples

### Build and Deploy Backend to Kahitoz
1. Open Jenkins job
2. Click "Build with Parameters"
3. **COMPONENT**: `backend`
4. **DEPLOY_NODE**: `kahitoz`
5. Click "Build"

### Build and Deploy Frontend to Naman
1. Open Jenkins job
2. Click "Build with Parameters"
3. **COMPONENT**: `frontend`
4. **DEPLOY_NODE**: `naman`
5. Click "Build"

### Build Both Components to Kahitoz
1. Open Jenkins job
2. Click "Build with Parameters"
3. **COMPONENT**: `both`
4. **DEPLOY_NODE**: `kahitoz`
5. Click "Build"

## Troubleshooting

### Issue: Docker Login Fails
- Check `docker_creds` credentials are correct
- Verify registries are accessible from Jenkins agent
- Ensure agent has Docker daemon running

### Issue: Kubernetes Deployment Fails
- Verify kubeconfig path exists: `$KUBECONFIG_NAMAN` or `$KUBECONFIG_KAHITOZ`
- Check Kubernetes cluster connectivity: `kubectl cluster-info`
- Verify namespace permissions

### Issue: Container Fails to Start
- Check image pull: `kubectl describe pod <pod-name> -n emi-shopping`
- Verify environment variables: `kubectl logs <pod-name> -c <container-name> -n emi-shopping`
- Check resource availability: `kubectl top nodes`

### Issue: Cloudflared Token Not Working
- Verify token in Jenkins credentials
- Check secret creation: `kubectl get secret cloudflared-token -n emi-shopping`
- View logs: `kubectl logs <pod-name> -c cloudflared -n emi-shopping`

## Pipeline Configuration

### Timeline
- Build: ~5-10 minutes
- Push: ~3-5 minutes
- Deploy: ~5-10 minutes
- Health Checks: ~2-3 minutes
- **Total**: ~20 minutes

### Retry Policy
- Automatic rollback on pod check failure
- Manual retry available from Jenkins
- 3-minute failure tolerance before restart

## Security Considerations

1. **Secrets Management**: All credentials stored in Jenkins and Kubernetes secrets
2. **Registry Authentication**: Private registries require credentials
3. **Network**: Cloudflared exposes service securely via tunnel
4. **Container Limits**: Resource limits prevent DoS
5. **Health Checks**: Automatic container restart on failure

## Deployment Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Jenkins Pipeline                          │
│                   (Parameterized)                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        v                             v
    Frontend                      Backend
    Pipeline                      Pipeline
    │                             │
    ├─► Load Env                  ├─► Load Env
    ├─► Build Image               ├─► Build Image
    ├─► Push Registry             ├─► Push Registry
    └─────┬──────────────────────┬┘
        │                             │
        └──────────────┬──────────────┘
                       │
        ┌──────────────v──────────────┐
        │  Kubernetes Deployment      │
        │  (emi-shopping namespace)   │
        └─────────────┬────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        v             v             v
    Frontend      Backend      Cloudflared
    Container     Container    Container
    (3000)        (3001)       (Tunnel)
    │             │            │
    └─────────────┴────────────┴─ K8s Service
                        │
                        v
                   Internet Users
```

## Monitoring & Logs

### View Pipeline Logs
```bash
# Jenkins Job Logs
Jenkins UI → Job → Build Number → Console Output

# Kubernetes Logs
kubectl logs -f deployment/emi-app-deployment -n emi-shopping -c <container-name>

# Pod Events
kubectl describe pod <pod-name> -n emi-shopping
```

## Maintenance

### Update Backend
1. Push code changes to GitHub
2. Run pipeline with `COMPONENT=backend`
3. Select deployment node
4. Pipeline automatically builds, pushes, and deploys

### Update Frontend
1. Push code changes to GitHub
2. Run pipeline with `COMPONENT=frontend`
3. Select deployment node
4. Pipeline automatically builds, pushes, and deploys

### Rollback
```bash
kubectl rollout history deployment/emi-app-deployment -n emi-shopping
kubectl rollout undo deployment/emi-app-deployment -n emi-shopping --to-revision=<revision>
```

## Future Enhancements

- [ ] Add SonarQube code quality analysis
- [ ] Add automated testing stage
- [ ] Add smoke tests post-deployment
- [ ] Add Slack notifications
- [ ] Add container registry cleanup
- [ ] Add backup/restore capabilities
- [ ] Add Blue-Green deployment strategy
- [ ] Add canary deployments
