# EMI Shopping App - Architecture & Deployment Guide

## 🏗️ Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GitHub Repository                                  │
│                   (EMI-Shopping-App - deployment branch)                     │
└────────────────────────────┬────────────────────────────────────────────────┘
                             │
                             │ Push triggers webhook
                             │
┌─────────────────────────────────────────────────────────────────────────────┐
│                         JENKINS SERVER                                      │
│                    (Parameterized Pipeline)                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ PARAMETERS:                                                          │   │
│  │ • COMPONENT: [frontend] [backend] [both]                            │   │
│  │ • DEPLOY_NODE: [naman] [kahitoz]                                    │   │
│  │ • GIT_BRANCH: deployment/CICD-Config-Files                          │   │
│  │ • SKIP_TESTS: true/false                                            │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  PIPELINE STAGES:                                                            │
│  1. Initialize          → Display config                                    │
│  2. Checkout SCM        → Clone from GitHub                                 │
│  3. Cleanup             → Remove old containers                             │
│  4. Backend Build       → Docker build (if enabled)                         │
│  5. Frontend Build      → Docker build (if enabled)                         │
│  6. Deploy Config       → K8s setup                                         │
│  7. Cloudflared Config  → Tunnel setup                                      │
│  8. Pod Health Check    → Verify 3 containers                               │
│                                                                              │
│  CREDENTIALS STORED:                                                         │
│  • docker_creds         → Registry authentication                           │
│  • backend_env          → Backend .env variables                            │
│  • frontend_env         → Frontend .env variables                           │
│  • cloudflared_token    → Tunnel authentication                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                    │                           │
         ┌──────────┘                           └──────────┐
         │                                                  │
         v                                                  v
    ┌─────────────┐                            ┌──────────────────┐
    │ Registry 1  │                            │   Registry 2     │
    │ PUSH        │                            │   PULL           │
    │ registrypush│                            │ registry.kahitoz │
    │ .kahitoz    │                            │      .com        │
    │ :5000       │                            │                  │
    └──────┬──────┘                            └────────┬─────────┘
           │ (temporary storage)                         │ (pull for deployment)
           └─────────────────────────┬───────────────────┘
                                     │
                ┌────────────────────┴────────────────────┐
                │                                         │
                v                                         v
    ┌──────────────────────────┐          ┌──────────────────────────┐
    │  NAMAN K8S CLUSTER       │          │  KAHITOZ K8S CLUSTER     │
    │  (Optional Deploy Node)  │          │  (Optional Deploy Node)  │
    │  ~/.kubenaman/config     │          │  ~/.kubekahitoz/config   │
    └──────────────────────────┘          └──────────────────────────┘
             │                                    │
             └────────────────┬───────────────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 v                         v
        (Selected by DEPLOY_NODE parameter)
             ↓
    ┌──────────────────────────────────────────────────┐
    │       KUBERNETES - emi-shopping namespace        │
    ├──────────────────────────────────────────────────┤
    │                                                  │
    │  ┌────────────────────────────────────────────┐ │
    │  │        emi-app-deployment (1 Pod)          │ │
    │  │  Replicas: 1 (scales 1-3 via HPA)         │ │
    │  │  Update Strategy: Rolling                  │ │
    │  ├────────────────────────────────────────────┤ │
    │  │                                            │ │
    │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐ │ │
    │  │  │ Frontend │  │ Backend  │  │Cloudflare│ │ │
    │  │  │          │  │          │  │   d      │ │ │
    │  │  │Next.js   │  │Node.js   │  │          │ │ │
    │  │  │          │  │          │  │Tunnel    │ │ │
    │  │  │Port:3000 │  │Port:3001 │  │Port:5572 │ │ │
    │  │  │          │  │          │  │          │ │ │
    │  │  │256Mi→512 │  │512Mi→1Gi │  │64Mi→256  │ │ │
    │  │  │100m→500m │  │200m→1000 │  │50m→250   │ │ │
    │  │  │CPU       │  │CPU       │  │CPU       │ │ │
    │  │  │          │  │          │  │          │ │ │
    │  │  │✓Live     │  │✓Live     │  │✓Live     │ │ │
    │  │  │✓Ready    │  │✓Ready    │  │✓Ready    │ │ │
    │  │  └──────────┘  └──────────┘  └──────────┘ │ │
    │  │                                            │ │
    │  │  Volumes: frontend-logs, backend-logs     │ │
    │  │                                            │ │
    │  └────────────────────────────────────────────┘ │
    │                      ↓                          │
    │  ┌────────────────────────────────────────────┐ │
    │  │   emi-app-service (LoadBalancer)           │ │
    │  │   • Port 80   → Frontend:3000              │ │
    │  │   • Port 3001 → Backend:3001               │ │
    │  └────────────────────────────────────────────┘ │
    │                                                  │
    │  ┌────────────────────────────────────────────┐ │
    │  │   HPA (1-3 replicas)                       │ │
    │  │   CPU: 70% threshold                       │ │
    │  │   Memory: 80% threshold                    │ │
    │  └────────────────────────────────────────────┘ │
    │                                                  │
    └──────────────────────────────────────────────────┘
             │
             └─────────── (3 containers running? ✓)
                         (All healthy? ✓)
                         (Ready for traffic? ✓)
                              ↓
    ┌──────────────────────────────────────────────────┐
    │        CLOUDFLARE TUNNEL                         │
    │  Exposes service to internet securely            │
    │  No public IP required                           │
    │  Auto-configured via pipeline                    │
    └──────────────────────────────────────────────────┘
             ↓
    DEPLOYMENT COMPLETE ✅
```

---

## 🔄 Pipeline Execution Flow

```
START
  │
  ├─ Stage 1: Initialize
  │  └─ Display pipeline config and parameters
  │
  ├─ Stage 2: Checkout SCM
  │  └─ git clone from GitHub
  │      ${GIT_BRANCH}
  │
  ├─ Stage 3: Cleanup
  │  └─ Remove old containers
  │  └─ Clean workspace
  │
  ├─ Stage 4: Backend Build & Push
  │  │ (Conditional: if COMPONENT=backend or both)
  │  ├─ load_backend_env.groovy
  │  │  └─ Load .env from Jenkins (backend_env)
  │  ├─ tag_pipeline.groovy
  │  │  └─ Tag as backend_build-${BUILD_NUMBER}
  │  ├─ build_docker_image.groovy
  │  │  └─ docker build backend:${IMAGE_TAG}
  │  └─ push_docker_image.groovy
  │     ├─ Push to registrypush.kahitoz.com:5000
  │     └─ Push to registry.kahitoz.com
  │
  ├─ Stage 5: Frontend Build & Push
  │  │ (Conditional: if COMPONENT=frontend or both)
  │  ├─ load_frontend_env.groovy
  │  │  └─ Load .env from Jenkins (frontend_env)
  │  ├─ tag_pipeline.groovy
  │  │  └─ Tag as frontend_build-${BUILD_NUMBER}
  │  ├─ build_docker_image.groovy
  │  │  └─ docker build frontend:${IMAGE_TAG}
  │  └─ push_docker_image.groovy
  │     ├─ Push to registrypush.kahitoz.com:5000
  │     └─ Push to registry.kahitoz.com
  │
  ├─ Stage 6: Deploy Configuration
  │  ├─ configure_deployment.groovy
  │  ├─ Select kubeconfig based on DEPLOY_NODE
  │  ├─ Create emi-shopping namespace
  │  ├─ Check if deployment exists
  │  │  ├─ If exists: kubectl rollout restart
  │  │  └─ If not: kubectl apply -f manifests/deployment.yaml
  │  └─ Wait for rollout readiness (5m timeout)
  │
  ├─ Stage 7: Cloudflared Configuration
  │  ├─ cloudflared_token.groovy
  │  ├─ Delete old cloudflared-token secret
  │  ├─ Create new secret with token
  │  │  └─ From Jenkins credential (cloudflared_token)
  │  └─ Verify secret creation
  │
  ├─ Stage 8: Pod Health Check
  │  ├─ podcheck.groovy
  │  ├─ Get pod name for emi-app-deployment
  │  ├─ Check 3 containers ready status:
  │  │  ├─ Frontend container ready? ✓/✗
  │  │  ├─ Backend container ready? ✓/✗
  │  │  └─ Cloudflared container ready? ✓/✗
  │  ├─ If 3/3 ready: PASS ✓
  │  └─ If <3/3 ready: FAIL ✗
  │
  ├─ Post Actions
  │  └─ Cleanup workspace
  │
  └─ COMPLETE
```

---

## 📦 Container Image Specifications

### Frontend Container (Next.js)
```yaml
Image: registry.kahitoz.com/emi_frontend:latest
Port: 3000
Environment:
  - NODE_ENV: production
  - NEXT_PUBLIC_API_URL: http://localhost:3001

Resources:
  Requests:
    Memory: 256Mi
    CPU: 100m
  Limits:
    Memory: 512Mi
    CPU: 500m

Health Checks:
  Liveness Probe:
    HTTP GET / (port 3000)
    Initial Delay: 15s
    Period: 20s
    Timeout: 5s
    Failures: 3
  
  Readiness Probe:
    HTTP GET / (port 3000)
    Initial Delay: 10s
    Period: 10s
    Timeout: 3s
    Failures: 2
```

### Backend Container (Node.js)
```yaml
Image: registry.kahitoz.com/emi_backend:latest
Port: 3001
Environment:
  - NODE_ENV: production
  - PORT: 3001
  - [From backend_env secret]

Resources:
  Requests:
    Memory: 512Mi
    CPU: 200m
  Limits:
    Memory: 1Gi
    CPU: 1000m

Health Checks:
  Liveness Probe:
    HTTP GET /health (port 3001)
    Initial Delay: 20s
    Period: 20s
    Timeout: 5s
    Failures: 3
  
  Readiness Probe:
    HTTP GET /health (port 3001)
    Initial Delay: 15s
    Period: 10s
    Timeout: 3s
    Failures: 2
```

### Cloudflared Container (Tunnel)
```yaml
Image: cloudflare/cloudflared:latest
Port: 5572 (metrics)
Command:
  - cloudflared
  - tunnel
  - --no-autoupdate
  - run
  - --token
  - $(CLOUDFLARED_TOKEN)

Environment:
  - CLOUDFLARED_TOKEN: [From cloudflared-token secret]
  - TZ: UTC

Resources:
  Requests:
    Memory: 64Mi
    CPU: 50m
  Limits:
    Memory: 256Mi
    CPU: 250m

Health Checks:
  Liveness Probe:
    Exec: ps aux | grep cloudflared | grep -v grep
    Initial Delay: 10s
    Period: 30s
    Timeout: 5s
    Failures: 3
```

---

## 🔐 Security Configuration

### Secrets
- `docker-creds`: Image pull credentials
- `backend-env`: Backend configuration (from Jenkins)
- `cloudflared-token`: Tunnel authentication (from Jenkins)

### Security Context
- runAsNonRoot: false (allows root if needed)
- readOnlyRootFilesystem: false (requires write access)
- fsGroup: 0

### Network Policy
- All containers in same pod (localhost communication)
- LoadBalancer service exposes ports 80, 3001
- Cloudflare tunnel provides secure internet access

---

## 📊 Resource Management

### Total Pod Resources
```
Requests:
  - Memory: 832Mi (256 + 512 + 64)
  - CPU: 350m (100 + 200 + 50)

Limits:
  - Memory: 1.768Gi (512 + 1024 + 256)
  - CPU: 1750m (500 + 1000 + 250)

HPA Scaling:
  - Triggers at CPU: 70% = 245m usage
  - Triggers at Memory: 80% = 1.414Gi usage
  - Scales to max 3 replicas
```

---

## 🔄 Deployment Scenarios

### Scenario 1: Build & Deploy Backend Only
```
COMPONENT: backend
DEPLOY_NODE: kahitoz

Result:
- Backend image built and pushed
- Frontend image: reused from registry (no rebuild)
- Cloudflared: reused from registry
- Rolling restart applied
```

### Scenario 2: Build & Deploy Frontend Only
```
COMPONENT: frontend
DEPLOY_NODE: naman

Result:
- Frontend image built and pushed
- Backend image: reused from registry (no rebuild)
- Cloudflared: reused from registry
- Rolling restart applied
```

### Scenario 3: Build & Deploy Both
```
COMPONENT: both
DEPLOY_NODE: kahitoz

Result:
- Both images built and pushed
- Cloudflared: reused from registry
- Rolling restart applied with both new images
```

---

## 📈 Monitoring & Observability

### Pod Metrics (via HPA)
```bash
# Watch pod scaling
kubectl get hpa -n emi-shopping -w

# View metrics
kubectl top pods -n emi-shopping
kubectl top nodes
```

### Container Logs
```bash
# Tail frontend logs
kubectl logs -f deployment/emi-app-deployment -n emi-shopping -c frontend

# Tail backend logs
kubectl logs -f deployment/emi-app-deployment -n emi-shopping -c backend

# Tail cloudflared logs
kubectl logs -f deployment/emi-app-deployment -n emi-shopping -c cloudflared

# All containers
kubectl logs -f deployment/emi-app-deployment -n emi-shopping --all-containers=true
```

### Pod Events
```bash
# Watch pod events in real-time
kubectl get events -n emi-shopping -w

# View specific pod details
kubectl describe pod <pod-name> -n emi-shopping
```

---

## 🚨 Failure Scenarios

### Scenario 1: Container Fails Health Check
```
Action: Kubelet restarts container (liveness probe)
Result: Automatic recovery, no manual intervention
Timeline: ~20-30 seconds
```

### Scenario 2: Container Not Ready for Traffic
```
Action: Traffic not sent, pod not marked ready (readiness probe)
Result: Existing traffic continues, new traffic waits
Timeline: Until readiness probe passes
```

### Scenario 3: Pod Resource Limit Exceeded
```
Action: Container throttled (CPU) or OOMKilled (Memory)
Result: Performance degradation or pod restart
Timeline: Immediate throttle, restart on OOMKill
```

### Scenario 4: Image Pull Fails
```
Action: Pod stays in ImagePullBackOff
Result: Deployment blocked, requires troubleshooting
Timeline: 5 minute retry backoff
Solution: Verify image exists in registry, credentials correct
```

---

## 🔧 Troubleshooting Decision Tree

```
Pipeline Failed?
  │
  ├─ Checkout Stage Failed?
  │  └─ Git credentials or branch not found
  │     → Check github_credentials
  │     → Verify branch exists
  │
  ├─ Build Stage Failed?
  │  ├─ Backend Build?
  │  │  └─ Check Dockerfile syntax
  │  │  └─ Check app/package.json exists
  │  │  └─ Check backend_env loaded
  │  └─ Frontend Build?
  │     └─ Check Dockerfile syntax
  │     └─ Check frontend dependencies
  │     └─ Check frontend_env loaded
  │
  ├─ Push Stage Failed?
  │  └─ Registry connection issue
  │     → Verify docker_creds
  │     → Test registry connectivity
  │     → Check image size
  │
  ├─ Deploy Stage Failed?
  │  ├─ Kubeconfig issue
  │  │  └─ Verify kubeconfig path
  │  │  └─ Verify kubeconfig permissions
  │  ├─ Kubectl issue
  │  │  └─ Check kubectl version
  │  │  └─ Check cluster connectivity
  │  └─ Manifest issue
  │     └─ Validate YAML syntax
  │     └─ Check resource quotas
  │
  └─ Health Check Failed?
     ├─ Container not running?
     │  └─ Check image pull status
     │  └─ Check resource availability
     ├─ Container unhealthy?
     │  └─ Check application logs
     │  └─ Check resource limits
     └─ Not all 3 containers?
        └─ Check pod status
        └─ Wait for readiness
```

---

## ✅ Deployment Readiness Checklist

### Pre-Deployment
- [ ] Kubeconfigs in place
- [ ] Jenkins credentials created
- [ ] Docker registries accessible
- [ ] Kubernetes clusters accessible
- [ ] Sufficient cluster resources
- [ ] Docker daemon running

### Deployment
- [ ] Pipeline parameters correct
- [ ] All stages pass
- [ ] Images pushed successfully
- [ ] Deployment manifest applied
- [ ] Secrets created in K8s

### Post-Deployment
- [ ] All 3 containers running
- [ ] All containers healthy
- [ ] Service endpoints working
- [ ] Cloudflare tunnel active
- [ ] Internet access working

---

## 📞 Support Resources

- **CI/CD Documentation**: See CICD_SETUP.md
- **Jenkins Setup**: See JENKINS_SETUP.md
- **Kubernetes Manifest**: See manifests/README.md
- **Main Overview**: See CI_CD_README.md

---

**Last Updated**: 2025-01-08  
**Status**: ✅ Production Ready
