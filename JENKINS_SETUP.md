# Jenkins Setup Quick Reference

## Credentials to Create in Jenkins

### 1. Docker Registry Credentials
**Path**: Manage Jenkins → Manage Credentials → System → Global credentials

- **ID**: `docker_creds`
- **Type**: Username with password
- **Username**: `<docker-registry-username>`
- **Password**: `<docker-registry-password>`
- **Scope**: Global
- **Description**: Docker registry credentials for pushing/pulling images

### 2. Backend Environment File
**Path**: Manage Jenkins → Manage Credentials → System → System

- **ID**: `backend_env`
- **Type**: Secret file
- **File**: Upload your `.env` file containing:
  ```
  DATABASE_URL=your_database_url
  API_KEY=your_api_key
  JWT_SECRET=your_jwt_secret
  [other backend variables]
  ```
- **Scope**: Global (System)
- **Folder**: emi-demo-app (create if needed)

### 3. Frontend Environment File
**Path**: Manage Jenkins → Manage Credentials → System → System

- **ID**: `frontend_env`
- **Type**: Secret file
- **File**: Upload your `.env` file containing:
  ```
  NEXT_PUBLIC_API_URL=http://api.example.com
  NEXT_PUBLIC_APP_NAME=EMI Shopping
  [other frontend variables]
  ```
- **Scope**: Global (System)
- **Folder**: emi-demo-app (create if needed)

### 4. Cloudflared Token
**Path**: Manage Jenkins → Manage Credentials → System → System

- **ID**: `cloudflared_token`
- **Type**: Secret text
- **Secret**: Paste your Cloudflare tunnel token
- **Scope**: Global (System)
- **Folder**: emi-demo-app (create if needed)

### 5. GitHub Credentials (Optional)
**Path**: Manage Jenkins → Manage Credentials → System → Global credentials

- **ID**: `github_credentials`
- **Type**: Username with password OR SSH key
- **Scope**: Global
- **Description**: GitHub authentication

---

## Agent/Node Requirements

### Docker Access
```bash
# Verify Docker is installed
docker --version

# Test Docker permissions
docker ps
```

### Kubernetes Access
```bash
# Verify kubectl is installed
kubectl version --client

# Test kubeconfig paths
ls -la /home/jenkins/.kubenaman/config
ls -la /home/jenkins/.kubekahitoz/config

# Test cluster connectivity
kubectl cluster-info --kubeconfig=/home/jenkins/.kubenaman/config
kubectl cluster-info --kubeconfig=/home/jenkins/.kubekahitoz/config
```

### Required Tools on Agent
- Docker (with daemon running)
- kubectl
- bash/shell

---

## Kubernetes Setup

### Create Namespace & Secrets

```bash
# Create namespace
kubectl create namespace emi-shopping

# Create docker registry secret (in each cluster)
kubectl create secret docker-registry docker-creds \
  --docker-server=registry.kahitoz.com \
  --docker-username=YOUR_USERNAME \
  --docker-password=YOUR_PASSWORD \
  --docker-email=your.email@example.com \
  -n emi-shopping
```

### Verify Setup
```bash
# Check namespace
kubectl get namespace emi-shopping

# Check secrets
kubectl get secrets -n emi-shopping
```

---

## First-Time Pipeline Execution

1. **Create Job in Jenkins**
   - New Item → Freestyle/Pipeline
   - Name: `EMI-Shopping-App-Pipeline`
   - Pipeline definition: Pipeline script from SCM
   - SCM: Git
   - Repository: https://github.com/naman-1905/EMI-Shopping-App.git
   - Branches: deployment/CICD-Config-Files

2. **Run with Parameters**
   - Click "Build with Parameters"
   - COMPONENT: `both` (for first deployment)
   - DEPLOY_NODE: `kahitoz` (or your target)
   - GIT_BRANCH: `deployment/CICD-Config-Files`
   - SKIP_TESTS: `false`
   - Click "Build"

3. **Monitor Execution**
   - Watch Console Output in Jenkins UI
   - Pipeline should complete in ~20-30 minutes

---

## Pipeline Environment Variables

These are automatically set in the pipeline:

```
REG1 = "registrypush.kahitoz.com:5000"
REG2 = "registry.kahitoz.com"
DOCKER_CRED_ID = 'docker_creds'
IMAGE_NAME_BACKEND = 'emi_backend'
IMAGE_NAME_FRONTEND = 'emi_frontend'
IMAGE_TAG = "${BUILD_NUMBER}-${BUILD_TIMESTAMP}"
KUBECONFIG_KAHITOZ = '/home/jenkins/.kubekahitoz/config'
KUBECONFIG_NAMAN = '/home/jenkins/.kubenaman/config'
```

---

## Troubleshooting Jenkins Setup

### Issue: Credentials not found
```
Solution:
1. Verify credentials exist in Jenkins
2. Check credential IDs match exactly:
   - docker_creds
   - backend_env
   - frontend_env
   - cloudflared_token
3. Verify scope is Global
4. Try re-entering credentials
```

### Issue: Docker build fails
```
Solution:
1. Check Docker daemon is running: docker ps
2. Verify Dockerfile syntax: docker build -f backend/Dockerfile .
3. Check Jenkins user has Docker permissions: groups jenkins
4. Test docker registry connection: docker login registry.kahitoz.com
```

### Issue: Kubernetes connection fails
```
Solution:
1. Verify kubeconfig paths exist
2. Test kubeconfig: kubectl --kubeconfig=/path config view
3. Check Jenkins user permissions on kubeconfig
4. Verify kubeconfig is not corrupted
5. Test cluster access: kubectl cluster-info
```

### Issue: Pod fails to start
```
Solution:
1. Check image pull: kubectl describe pod <name> -n emi-shopping
2. Verify secret exists: kubectl get secret docker-creds -n emi-shopping
3. Check image availability in registry
4. View pod logs: kubectl logs <pod-name> -n emi-shopping
```

---

## Testing the Pipeline

### Quick Test
```bash
# Test Docker image build locally
cd backend
docker build -t emi_backend:test -f Dockerfile .

cd ../frontend
docker build -t emi_frontend:test -f Dockerfile .

# Test Kubernetes deployment manifest
kubectl apply -f manifests/deployment.yaml --dry-run=client -o yaml
```

### Pre-Flight Checks
```bash
# 1. Check registries
docker login registrypush.kahitoz.com:5000
docker login registry.kahitoz.com

# 2. Check Kubernetes
kubectl cluster-info --kubeconfig=/home/jenkins/.kubenaman/config
kubectl cluster-info --kubeconfig=/home/jenkins/.kubekahitoz/config

# 3. Check credentials in Jenkins (run script)
# In Jenkins Script Console: Manage Jenkins → Script Console
println(System.getenv('PATH'))
```

---

## Post-Deployment Verification

After successful pipeline execution:

```bash
# Check deployment
kubectl get deployment -n emi-shopping

# Check pods
kubectl get pods -n emi-shopping

# Check services
kubectl get svc -n emi-shopping

# Check pod logs
kubectl logs -n emi-shopping -l app=emi-app --all-containers=true -f

# Check events
kubectl get events -n emi-shopping --sort-by='.lastTimestamp'

# Verify all containers running
kubectl get pods -n emi-shopping -o wide
```

---

## Jenkins Console Commands Reference

### Access Kubernetes from Jenkins

```bash
# List deployments (Naman cluster)
export KUBECONFIG=/home/jenkins/.kubenaman/config
kubectl get deployment -n emi-shopping

# List deployments (Kahitoz cluster)
export KUBECONFIG=/home/jenkins/.kubekahitoz/config
kubectl get deployment -n emi-shopping
```

### View Build Artifacts

```bash
# List built images
docker images | grep emi_

# Inspect image
docker inspect emi_backend:latest
```

---

## Configuration Files Checklist

- ✓ `/Jenkinsfile` - Main pipeline
- ✓ `/backend/Dockerfile` - Backend container
- ✓ `/backend/.dockerignore` - Build exclusions
- ✓ `/backend/build_stages/*.groovy` - Backend build stages
- ✓ `/frontend/Dockerfile` - Frontend container
- ✓ `/frontend/.dockerignore` - Build exclusions
- ✓ `/frontend/build_stages/*.groovy` - Frontend build stages
- ✓ `/build_stages/*.groovy` - Common build stages
- ✓ `/manifests/deployment.yaml` - K8s manifest
- ✓ `/manifests/README.md` - CI/CD documentation

---

## Support & Debugging

### Enable Debug Mode
Edit Jenkins job → Configure → Pipeline → Additional Behaviors
Add `-x` flag to shell commands in build stages

### View Detailed Logs
```bash
# Jenkins job logs
Jenkins UI → Job → Build Number → Console Output

# Kubernetes events
kubectl get events -n emi-shopping -w

# Pod logs with timestamps
kubectl logs deployment/emi-app-deployment -n emi-shopping \
  --timestamps=true --all-containers=true -f
```

---

**Ready to Deploy!** 🚀

Once credentials are configured and kubeconfigs are in place, your CI/CD pipeline is ready to use.
