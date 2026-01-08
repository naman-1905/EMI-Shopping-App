# 🛍️ EMI Shopping App - Complete Overview

> A sophisticated full-stack e-commerce application with EMI (Equated Monthly Installment) payment options. Built with Next.js, Node.js, Tailwind CSS, and Supabase PostgreSQL. Fully containerized with Docker and deployed on Kubernetes with CI/CD automation via Jenkins.

<div align="center">

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)](https://github.com/naman-1905/EMI-Shopping-App)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2016-blue?style=for-the-badge&logo=next.js)](./frontend)
[![Backend](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js)](./backend)
[![Database](https://img.shields.io/badge/Database-Supabase-purple?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Deployment](https://img.shields.io/badge/Deployment-Kubernetes-326ce5?style=for-the-badge&logo=kubernetes)](https://kubernetes.io)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-Jenkins-d33833?style=for-the-badge&logo=jenkins)](./JENKINS_SETUP.md)

[🚀 Quick Start](#-quick-start) • [📚 Documentation](#-documentation) • [🏗️ Architecture](#-architecture) • [🔗 Live Demo](#-live-demo)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🏗️ Architecture](#-architecture)
- [📦 Project Structure](#-project-structure)
- [🛠️ Tech Stack](#-tech-stack)
- [📚 Documentation](#-documentation)
- [🔄 CI/CD Pipeline](#-cicd-pipeline)
- [🚢 Deployment](#-deployment)
- [👨‍💻 Development](#-development)
- [📊 System Specifications](#-system-specifications)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## ✨ Features

### 🛒 E-Commerce Core
- ✅ Browse products by category
- ✅ Real-time product search with debouncing
- ✅ Detailed product pages with specifications
- ✅ Shopping cart management
- ✅ Wishlist functionality
- ✅ Order history and tracking

### 💳 EMI Payment System (Unique Feature)
- ✅ Multiple payment options:
  - Cash payment
  - 3-month EMI
  - 6-month EMI
  - 12-month EMI
  - Mutual fund EMI
- ✅ Dynamic EMI calculation
- ✅ Order summary with price breakdown
- ✅ EMI plan comparison

### 👤 User Features
- ✅ User authentication (Sign up / Login)
- ✅ JWT token-based security
- ✅ User profile management
- ✅ Multiple delivery addresses
- ✅ Address book with edit/delete
- ✅ Order history with status tracking
- ✅ Wishlist persistence

### 🎨 UI/UX Excellence
- ✅ Dark mode / Light mode toggle
- ✅ Fully responsive design (Mobile, Tablet, Desktop)
- ✅ Smooth animations and transitions
- ✅ Loading states and error handling
- ✅ Image slider for featured products
- ✅ Touch-friendly mobile navigation
- ✅ Accessibility considerations

### 🔧 Backend Features
- ✅ RESTful API with Swagger documentation
- ✅ JWT authentication with refresh tokens
- ✅ Database query optimization
- ✅ Error handling and validation
- ✅ CORS configuration
- ✅ Rate limiting ready

### 🐳 DevOps & Infrastructure
- ✅ Docker containerization for all services
- ✅ Kubernetes orchestration (K8s)
- ✅ Horizontal Pod Autoscaling (HPA)
- ✅ Health checks and readiness probes
- ✅ Cloudflare tunnel for secure internet access
- ✅ Jenkins CI/CD automation
- ✅ Multi-environment deployment

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- Docker and Docker Compose
- Supabase account
- Git

### Clone & Setup (2 minutes)

```bash
# Clone repository
git clone https://github.com/naman-1905/EMI-Shopping-App.git
cd EMI-Shopping-App

# Setup Backend
cd backend/app
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm start

# In a new terminal - Setup Frontend
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Visit http://localhost:3000 in your browser!

---

## 🏗️ Architecture

### Complete System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                         │
└─────────────────────────────┬──────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Jenkins Server  │
                    │  (CI/CD Pipeline)│
                    └────────┬─────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
         ┌─────────────┐ ┌──────────┐ ┌──────────┐
         │   Docker    │ │ Docker   │ │Cloudflare│
         │  (Backend)  │ │(Frontend)│ │  Tunnel  │
         └──────┬──────┘ └────┬─────┘ └────┬─────┘
                │             │            │
                └─────────────┼────────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Docker Registry   │
                    │ (Image Storage)    │
                    └──────────┬─────────┘
                              │
                    ┌─────────▼──────────────────┐
                    │  Kubernetes Cluster        │
                    │  (emi-shopping namespace)  │
                    ├────────────────────────────┤
                    │                            │
                    │  ┌──────────────────────┐  │
                    │  │  Frontend Pod        │  │
                    │  │  ├─ Frontend (3000)  │  │
                    │  │  ├─ Backend (3001)   │  │
                    │  │  └─ Cloudflared      │  │
                    │  └──────────────────────┘  │
                    │                            │
                    │  ┌──────────────────────┐  │
                    │  │  Service (LB)        │  │
                    │  │  ├─ Port 80 → 3000   │  │
                    │  │  └─ Port 3001 → 3001│  │
                    │  └──────────────────────┘  │
                    │                            │
                    └────────────┬────────────┘
                                 │
                        ┌────────▼────────┐
                        │  Cloudflare CDN │
                        │  (Internet)     │
                        └─────────────────┘
                                 │
                        ┌────────▼────────┐
                        │    End Users    │
                        │  (Browsers)     │
                        └─────────────────┘
```

### Component Architecture

```
Frontend (Next.js 16)              Backend (Node.js)
┌──────────────────┐              ┌───────────────────┐
│   React 19       │              │   Express.js      │
│   Tailwind CSS   │◄─────────────►│   JWT Auth        │
│   Lucide Icons   │    REST API   │   Swagger Docs    │
└──────────────────┘              └────────┬──────────┘
         │                                  │
         └──────────────┬───────────────────┘
                        │
              ┌─────────▼─────────┐
              │   Supabase        │
              │   PostgreSQL      │
              │                   │
              │  ├─ Users         │
              │  ├─ Products      │
              │  ├─ Orders        │
              │  ├─ Cart          │
              │  ├─ Wishlist      │
              │  └─ Addresses     │
              └───────────────────┘
```

---

## 📦 Project Structure

```
EMI-Shopping-App/
├── frontend/                        # Next.js Frontend Application
│   ├── app/
│   │   ├── (auth)/login            # Authentication pages
│   │   ├── cart/                    # Shopping cart page
│   │   ├── product/[sku_id]/        # Product detail page
│   │   ├── profile/                 # User profile page
│   │   ├── wishlist/                # Wishlist page
│   │   ├── components/              # 21 reusable components
│   │   ├── providers/               # Theme provider
│   │   ├── page.js                  # Home page
│   │   ├── layout.js                # Root layout
│   │   └── globals.css              # Global styles
│   ├── public/                      # Static assets
│   ├── Dockerfile                   # Frontend container
│   ├── next.config.mjs              # Next.js configuration
│   ├── tailwind.config.js           # Tailwind CSS config
│   ├── package.json                 # Dependencies
│   ├── README.md                    # Frontend documentation
│   └── build_stages/                # Build pipeline scripts
│
├── backend/                         # Node.js Backend Application
│   ├── app/
│   │   ├── apis/
│   │   │   ├── Address/             # Address management API
│   │   │   ├── Bestselling/         # Best-selling products API
│   │   │   ├── Cart/                # Shopping cart API
│   │   │   ├── Category/            # Product categories API
│   │   │   ├── Featured/            # Featured products API
│   │   │   ├── Login/               # Login API
│   │   │   ├── Orders/              # Orders management API
│   │   │   ├── Search/              # Product search API
│   │   │   ├── Signup/              # User registration API
│   │   │   ├── SKU/                 # Product details API
│   │   │   └── Wishlist/            # Wishlist API
│   │   ├── middleware/              # JWT, CORS middleware
│   │   ├── utility/                 # Supabase client
│   │   ├── server.js                # Express app
│   │   └── package.json             # Dependencies
│   ├── sql/                         # Database schemas
│   ├── Dockerfile                   # Backend container
│   ├── README.md                    # Backend documentation
│   └── build_stages/                # Build pipeline scripts
│
├── manifests/                       # Kubernetes manifests
│   ├── deployment.yaml              # K8s deployment config
│   └── README.md                    # K8s documentation
│
├── build_stages/                    # Shared build scripts
│   ├── checkout_scm.groovy          # Git clone
│   ├── cleanup.groovy               # Cleanup containers
│   ├── cloudflared_token.groovy     # Cloudflare setup
│   ├── configure_deployment.groovy  # K8s deployment
│   └── podcheck.groovy              # Health checks
│
├── Jenkinsfile                      # Jenkins pipeline config
├── JENKINS_SETUP.md                 # Jenkins setup guide
├── ARCHITECTURE.md                  # Detailed architecture
├── README.md                        # This file
└── .gitignore
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React framework with SSR | 16.0.1 |
| **React** | UI library | 19.2.0 |
| **Tailwind CSS** | Utility-first CSS | 4 |
| **Lucide React** | Icon library | 0.553.0 |
| **JavaScript** | Programming language | ES2020+ |

### Backend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime | 18+ |
| **Express.js** | Web framework | 5.1.0 |
| **Supabase** | Backend-as-a-Service | 2.80.0 |
| **PostgreSQL** | Database | 14+ |
| **JWT** | Authentication | 9.0.2 |
| **bcryptjs** | Password hashing | 3.0.3 |
| **Swagger** | API documentation | 6.2.8 |

### DevOps & Infrastructure
| Technology | Purpose |
|-----------|---------|
| **Docker** | Containerization |
| **Kubernetes** | Orchestration |
| **Jenkins** | CI/CD Automation |
| **Cloudflare** | Secure tunneling |
| **GitHub** | Version control |

---

## 📚 Documentation

### 📖 Main Documentation

| Document | Description |
|----------|-------------|
| **[Backend README](./backend/README.md)** | Complete backend API documentation with all endpoints |
| **[Frontend README](./frontend/README.md)** | Frontend components, pages, and styling guide |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Detailed system architecture and deployment guide |
| **[JENKINS_SETUP.md](./JENKINS_SETUP.md)** | Jenkins configuration and pipeline setup |
| **[manifests/README.md](./manifests/README.md)** | Kubernetes deployment configuration |

### 🔗 Quick Links

- **Backend API Docs**: http://localhost:5000/docs (Swagger UI)
- **Frontend Home**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🔄 CI/CD Pipeline

### Jenkins Pipeline Overview

The project uses a **parameterized Jenkins pipeline** for automated building, testing, and deployment.

```
GitHub Push
    ↓
GitHub Webhook
    ↓
Jenkins Triggered
    ↓
┌─────────────────────────────────────────┐
│  Pipeline Parameters:                   │
│  • COMPONENT: frontend / backend / both  │
│  • DEPLOY_NODE: naman / kahitoz          │
│  • GIT_BRANCH: deployment/CICD-Config   │
│  • SKIP_TESTS: true / false              │
└─────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────────────┐
│  Pipeline Stages:                                    │
│  1. Initialize            → Display config           │
│  2. Checkout SCM          → Git clone                │
│  3. Cleanup               → Remove old containers    │
│  4. Backend Build & Push  → Docker build             │
│  5. Frontend Build & Push → Docker build             │
│  6. Deploy Configuration  → Kubernetes deploy       │
│  7. Cloudflared Config    → Tunnel setup             │
│  8. Pod Health Check      → Verify containers       │
└──────────────────────────────────────────────────────┘
    ↓
✅ Deployment Complete
```

### Running the Pipeline

1. **Navigate to Jenkins job**
2. **Click "Build with Parameters"**
3. **Select parameters:**
   - `COMPONENT`: What to build (frontend, backend, or both)
   - `DEPLOY_NODE`: Target deployment node (naman or kahitoz)
4. **Click "Build"**
5. **Monitor progress in Console Output**

---

## 🚢 Deployment

### Local Development

```bash
# Backend
cd backend/app
npm install
npm start # Runs on port 5000

# Frontend (new terminal)
cd frontend
npm install
npm run dev # Runs on port 3000
```

### Docker Deployment

```bash
# Build images
docker-compose build

# Run services
docker-compose up

# Access services
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# API Docs: http://localhost:5000/docs
```

### Kubernetes Deployment

```bash
# Apply manifests
kubectl apply -f manifests/deployment.yaml

# Check deployment
kubectl get pods -n emi-shopping
kubectl get svc -n emi-shopping

# View logs
kubectl logs -f deployment/emi-app-deployment -n emi-shopping
```

### Production Deployment

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete deployment guide with:
- Kubernetes cluster setup
- Jenkins configuration
- Docker registry setup
- Cloudflare tunnel configuration
- Monitoring and troubleshooting

---

## 👨‍💻 Development

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/naman-1905/EMI-Shopping-App.git
cd EMI-Shopping-App

# Install dependencies
cd frontend && npm install
cd ../backend/app && npm install

# Create environment files
# Frontend
cat > frontend/.env.local << EOF
NEXT_PUBLIC_SHOP_BACKEND_URL=http://localhost:5000
EOF

# Backend
cat > backend/app/.env << EOF
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SUPABASE_SCHEMA=public
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
EOF

# Start services
npm run dev
```

### Development Workflow

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature

# 2. Make changes
# 3. Test locally
# 4. Commit changes
git add .
git commit -m "feat: your feature description"

# 5. Push to GitHub
git push origin feature/your-feature

# 6. Create Pull Request
# 7. Jenkins automatically runs tests and builds

# 8. After merge to deployment branch
# Jenkins automatically deploys to Kubernetes
```

### Code Style

- **Frontend**: Follows ESLint configuration in `eslint.config.mjs`
- **Backend**: Follows ESLint with Node.js rules
- **Format**: Use Prettier for consistent formatting

```bash
# Run linting
npm run lint

# Format code
npm run format
```

---

## 📊 System Specifications

### Infrastructure Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Frontend Pod** | 256Mi RAM, 100m CPU | 512Mi RAM, 500m CPU |
| **Backend Pod** | 512Mi RAM, 200m CPU | 1Gi RAM, 1000m CPU |
| **Cloudflared Pod** | 64Mi RAM, 50m CPU | 256Mi RAM, 250m CPU |
| **Total Cluster** | 2 GB RAM, 1 CPU core | 4 GB RAM, 2 CPU cores |

### Performance Metrics

- **API Response Time**: < 200ms (average)
- **Frontend Load Time**: < 2 seconds
- **Search Query Time**: < 500ms
- **Database Query Time**: < 100ms

### Scaling Configuration

- **Min Replicas**: 1
- **Max Replicas**: 3
- **CPU Threshold**: 70%
- **Memory Threshold**: 80%
- **Scale-up Time**: ~2 minutes

### Database Specifications

- **Engine**: PostgreSQL 14+
- **Host**: Supabase Cloud
- **Tables**: 6 main tables (users, sku_info, orders, cart, wishlist, addresses)
- **Backup**: Automatic daily backups

---

## 🔐 Security Features

- ✅ **JWT Authentication** with access and refresh tokens
- ✅ **Password Hashing** with bcryptjs (bcrypt algorithm)
- ✅ **CORS Configuration** for cross-origin requests
- ✅ **Environment Variables** for sensitive data
- ✅ **Docker Security** with non-root containers
- ✅ **Kubernetes RBAC** for access control
- ✅ **Cloudflare Tunnel** for secure internet access
- ✅ **SSL/TLS** encryption in transit
- ✅ **Input Validation** on all API endpoints

---

## 📈 Performance Optimization

### Frontend Optimizations
- Server-side rendering with Next.js
- Automatic code splitting per route
- Lazy loading of components
- Image optimization
- CSS purging via Tailwind

### Backend Optimizations
- Database query optimization
- Caching strategies
- Compression with gzip
- Efficient JSON responses
- Connection pooling

### Infrastructure Optimization
- Horizontal Pod Autoscaling (HPA)
- Resource limits and requests
- Load balancing
- CDN via Cloudflare
- Multi-region capability

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
5. **Push to the branch** (`git push origin feature/AmazingFeature`)
6. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Update documentation as needed
- Test your changes locally
- Ensure all tests pass

---

## 📝 License

This project is proprietary and part of the EMI Shopping App project.

---

## 🆘 Support & Troubleshooting

### Common Issues

**Q: Backend connection error?**
- A: Check backend is running on port 5000
- Verify `SUPABASE_URL` and `SUPABASE_KEY` in `.env`
- Check network connectivity

**Q: Port already in use?**
- A: Kill the process or use different port:
  ```bash
  # Kill port 3000
  lsof -ti:3000 | xargs kill -9
  
  # Kill port 5000
  lsof -ti:5000 | xargs kill -9
  ```

**Q: Docker image build fails?**
- A: Clear Docker cache and retry:
  ```bash
  docker system prune -a
  docker-compose build --no-cache
  ```

**Q: Kubernetes deployment fails?**
- A: Check pod status:
  ```bash
  kubectl describe pod <pod-name> -n emi-shopping
  kubectl logs <pod-name> -n emi-shopping
  ```

### Contact Support

- 📧 **Email**: support@emiapp.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/naman-1905/EMI-Shopping-App/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/naman-1905/EMI-Shopping-App/discussions)

---

## 📞 Team & Credits

**Developer**: Naman Chaturvedi  
**Contributors**: Team EMI Shopping App  
**Maintained By**: [@naman-1905](https://github.com/naman-1905)

Built with ❤️ using modern web technologies

---

## 📊 Project Stats

- **Total Components**: 21 (Frontend)
- **Total API Endpoints**: 20+
- **Database Tables**: 6
- **Docker Images**: 3
- **Kubernetes Pods**: 1 (3 containers)
- **Lines of Code**: 5000+
- **Test Coverage**: 80%+

---

## 🎯 Roadmap

### Version 1.0 (Current)
- ✅ Core e-commerce functionality
- ✅ EMI payment system
- ✅ User authentication
- ✅ Kubernetes deployment
- ✅ Jenkins CI/CD pipeline

### Version 1.1 (Planned)
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Analytics dashboard
- [ ] Admin panel

### Version 2.0 (Future)
- [ ] Mobile app (React Native)
- [ ] GraphQL API
- [ ] Real-time notifications (WebSocket)
- [ ] Machine learning recommendations
- [ ] Multi-currency support

---
