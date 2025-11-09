# 🛍️ EMI Shopping App - Frontend

> A modern, responsive Next.js e-commerce frontend featuring real-time product search, dark mode, shopping cart, wishlist, and EMI payment options. Built with React 19, Tailwind CSS, and Lucide Icons.

---

## 📋 Table of Contents

- [✨ Features](#features)
- [🚀 Quick Start](#quick-start)
- [📦 Installation](#installation)
- [⚙️ Environment Setup](#environment-setup)
- [🏗️ Project Structure](#project-structure)
- [🧩 Components](#components)
- [📄 Pages](#pages)
- [🎨 Styling & Theme](#styling--theme)
- [🔗 Backend Integration](#backend-integration)
- [🛠️ Development](#development)
- [🐳 Docker](#docker)
- [📱 Responsive Design](#responsive-design)
- [🚀 Deployment](#deployment)

---

## ✨ Features

### 🛒 E-Commerce Core
- ✅ Product browsing with category filtering
- ✅ Real-time product search with debouncing
- ✅ Product detail pages with EMI plans
- ✅ Shopping cart management
- ✅ Wishlist functionality
- ✅ Order placement and tracking

### 💳 Payment Options
- ✅ Cash payment option
- ✅ EMI payment plans (3, 6, 12 months)
- ✅ Mutual fund EMI option
- ✅ Order summary with price breakdown

### 👤 User Features
- ✅ User authentication (Login/Signup)
- ✅ User profile management
- ✅ Multiple delivery addresses
- ✅ Order history and tracking
- ✅ Address book management

### 🎨 UI/UX
- ✅ Dark mode / Light mode toggle
- ✅ Fully responsive design (Mobile, Tablet, Desktop)
- ✅ Smooth animations and transitions
- ✅ Loading states and error handling
- ✅ Image slider for featured products
- ✅ Touch-friendly mobile navigation

### 🔧 Technical
- ✅ Server-side rendering with Next.js 16
- ✅ Modern React 19 with hooks
- ✅ Tailwind CSS 4 for styling
- ✅ Lucide React icons
- ✅ JWT authentication
- ✅ Responsive Images

---

## 🚀 Quick Start

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Installation

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Backend API running (see backend README)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EMI-Shopping-App/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env.local file
   cat > .env.local << EOF
   NEXT_PUBLIC_SHOP_BACKEND_URL=http://localhost:5000
   EOF
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## ⚙️ Environment Setup

### Required Environment Variables

Create `.env.local` file in the `frontend` directory:

```env
# Backend API URL
NEXT_PUBLIC_SHOP_BACKEND_URL=http://localhost:5000

# Optional: Analytics, CDN, etc.
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Environment Explanation

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_SHOP_BACKEND_URL` | Backend API endpoint | `http://localhost:5000` |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never store sensitive secrets here.

---

## 🏗️ Project Structure

```
frontend/
├── app/
│   ├── (auth)/                 # Authentication routes
│   │   └── login/
│   │       └── page.js         # Login page
│   ├── cart/
│   │   └── page.js             # Shopping cart page
│   ├── product/
│   │   └── [sku_id]/
│   │       └── page.js         # Product detail page
│   ├── profile/
│   │   └── page.js             # User profile page
│   ├── wishlist/
│   │   └── page.jsx            # Wishlist page
│   ├── components/             # Reusable components
│   │   ├── ActionButtons.jsx   # CTA buttons
│   │   ├── Addresses.jsx       # Address management
│   │   ├── AuthComponent.jsx   # Auth wrapper
│   │   ├── Banner.jsx          # Image slider
│   │   ├── BestSelling.jsx     # Product grid
│   │   ├── BottomBar.jsx       # Mobile navigation
│   │   ├── Cart.jsx            # Cart display
│   │   ├── CartItem.jsx        # Cart item component
│   │   ├── CategoryCircles.jsx # Category filter
│   │   ├── CheckoutSuccess.jsx # Success page
│   │   ├── DeliveryAddress.jsx # Address selection
│   │   ├── LoginModal.jsx      # Login modal
│   │   ├── MobileSearchBar.jsx # Mobile search
│   │   ├── OrderSummary.jsx    # Order summary
│   │   ├── Orders.jsx          # Orders list
│   │   ├── ProductInfo.jsx     # Product details
│   │   ├── ProductPhoto.jsx    # Product image
│   │   ├── TopBar.jsx          # Navigation header
│   │   ├── UserInfo.jsx        # User profile
│   │   ├── Variants.jsx        # Product variants
│   │   └── Wishlist.jsx        # Wishlist display
│   ├── providers/
│   │   └── ThemeProviders.js   # Theme context
│   ├── layout.js               # Root layout
│   ├── page.js                 # Home page
│   ├── globals.css             # Global styles
│   └── favicon.ico             # Favicon
├── public/                     # Static assets
├── package.json                # Dependencies
├── next.config.mjs             # Next.js config
├── tailwind.config.js          # Tailwind config
├── postcss.config.mjs          # PostCSS config
├── jsconfig.json               # JS config
├── eslint.config.mjs           # ESLint config
├── .gitignore
└── Dockerfile
```

---

## 🧩 Components

### 📊 Layout Components

#### **TopBar.jsx**
- Main navigation header
- Search functionality with debouncing
- Shopping icons (Cart, Wishlist, Profile)
- Dark mode toggle
- Responsive navigation

```jsx
import Navbar from "./components/TopBar";

// Usage
<Navbar />
```

#### **BottomBar.jsx**
- Mobile bottom navigation
- Quick access to main sections
- Only visible on mobile devices

```jsx
import MobileBottomBar from "./components/BottomBar";

// Usage
<MobileBottomBar />
```

---

### 🛍️ Product Components

#### **BestSelling.jsx**
Displays featured/best-selling products with filtering capabilities.

```jsx
import BestSellingProducts from "./components/BestSelling";

// Usage
<BestSellingProducts selectedCategory={0} />
```

**Features:**
- Fetches products from backend
- Category filtering
- Loading and error states
- Responsive grid layout

#### **ProductInfo.jsx**
Detailed product information display.

```jsx
// Usage - Shows product details
<ProductInfo 
  product={productData}
  selectedVariant={variant}
/>
```

**Displays:**
- Product name and brand
- Price and discounts
- EMI options
- Ratings and reviews
- Description and specifications

#### **Variants.jsx**
Product variant selection (size, color, etc.).

```jsx
<Variants 
  onSelect={handleVariantSelect}
  variants={productVariants}
/>
```

---

### 🛒 Cart & Checkout Components

#### **Cart.jsx**
Main shopping cart display.

```jsx
import CartComponent from "./components/Cart";

// Usage
<CartComponent />
```

**Features:**
- List all cart items
- Quantity adjustment
- Remove items
- Price calculation

#### **CartItem.jsx**
Individual cart item component.

```jsx
<CartItem 
  item={cartItem}
  onRemove={handleRemove}
  onQuantityChange={handleQuantityChange}
/>
```

#### **DeliveryAddress.jsx**
Address selection and management during checkout.

```jsx
<DeliveryAddress 
  onSelect={handleAddressSelect}
  addresses={userAddresses}
/>
```

#### **OrderSummary.jsx**
Order summary with price breakdown.

```jsx
<OrderSummary 
  items={cartItems}
  shippingCost={100}
  tax={200}
/>
```

---

### ❤️ Wishlist Components

#### **Wishlist.jsx**
Wishlist display component.

```jsx
import WishlistComponent from "./components/Wishlist";

// Usage
<WishlistComponent />
```

---

### 👤 User Components

#### **UserInfo.jsx**
User profile information display.

```jsx
<UserInfo user={currentUser} />
```

#### **Addresses.jsx**
User address book management.

```jsx
<Addresses 
  addresses={userAddresses}
  onAdd={handleAddAddress}
  onDelete={handleDeleteAddress}
/>
```

#### **Orders.jsx**
User order history and tracking.

```jsx
<Orders orders={userOrders} />
```

---

### 🔍 Search & Filter Components

#### **MobileSearchBar.jsx**
Search bar for mobile devices.

```jsx
import MobileSearchBar from "./components/MobileSearchBar";

// Usage
<MobileSearchBar />
```

#### **CategoryCircles.jsx**
Category filter with visual selection.

```jsx
<CategoryCircles 
  selectedCategory={0}
  onCategorySelect={handleCategorySelect}
/>
```

---

### 🎞️ Media Components

#### **Banner.jsx**
Image slider for featured products.

```jsx
<Banner images={images} />
```

**Features:**
- Auto-rotating slides
- Touch/swipe gestures
- Keyboard controls
- Navigation arrows

#### **ProductPhoto.jsx**
Product image display component.

```jsx
<ProductPhoto 
  url={imageUrl}
  alt="Product name"
/>
```

---

### 🔐 Authentication Components

#### **AuthComponent.jsx**
Authentication wrapper and protection.

```jsx
<AuthComponent>
  <ProtectedPage />
</AuthComponent>
```

#### **LoginModal.jsx**
Login/Sign-up modal dialog.

```jsx
<LoginModal 
  isOpen={isOpen}
  onClose={handleClose}
/>
```

---

## 📄 Pages

### 🏠 Home Page (`app/page.js`)
Landing page with featured products and categories.

```
GET / → Home page with:
- Featured banner
- Product categories
- Best-selling products
```

### 🛍️ Cart Page (`app/cart/page.js`)
Shopping cart management page.

```
GET /cart → Cart page displaying:
- Cart items list
- Quantity controls
- Price summary
- Checkout button
```

### 📦 Product Detail Page (`app/product/[sku_id]/page.js`)
Individual product details and purchase options.

```
GET /product/[sku_id] → Shows:
- Product images
- Detailed specifications
- EMI options
- Add to cart/wishlist buttons
- Customer reviews
```

### 👤 Profile Page (`app/profile/page.js`)
User account and settings page.

```
GET /profile → Displays:
- User information
- Address book
- Order history
- Account settings
```

### ❤️ Wishlist Page (`app/wishlist/page.jsx`)
User's wishlist of saved items.

```
GET /wishlist → Shows:
- Wishlist items
- Move to cart option
- Remove from wishlist
```

### 🔑 Login Page (`app/(auth)/login/page.js`)
Authentication page for login and signup.

```
GET /(auth)/login → Login/Signup form with:
- Email input
- Password input
- OAuth options
- Sign up form
```

---

## 🎨 Styling & Theme

### Tailwind CSS Integration

The project uses **Tailwind CSS 4** with custom theme configuration.

**Global Styles:** `app/globals.css`
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### Theme Provider

**File:** `app/providers/ThemeProviders.js`

Provides global theme context for dark/light mode.

```jsx
import { useTheme } from '../providers/ThemeProviders';

export default function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```

### Color Scheme

| Light Mode | Dark Mode |
|-----------|-----------|
| Background: #ffffff | Background: #0a0a0a |
| Foreground: #171717 | Foreground: #ededed |

### Custom Components

Built-in responsive utilities:
- Mobile-first breakpoints
- Hover states
- Dark mode variants
- Smooth transitions

---

## 🔗 Backend Integration

### API Communication

All API calls are made to the backend URL specified in environment variables:

```javascript
const API_BASE = process.env.NEXT_PUBLIC_SHOP_BACKEND_URL;

// Example fetch call
const response = await fetch(`${API_BASE}/api/cart`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  }
});
```

### Key API Integrations

#### Product Listing
```javascript
// Fetch featured products
fetch(`${API}/api/featured/skus`)

// Search products
fetch(`${API}/api/search?query=keyword`)

// Get product details
fetch(`${API}/api/sku/info/SKU001`)
```

#### Authentication
```javascript
// Sign up
fetch(`${API}/api/signup`, {
  method: 'POST',
  body: JSON.stringify({ email, password, first_name })
})

// Login
fetch(`${API}/api/login`, {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
```

#### User Features
```javascript
// Get cart
fetch(`${API}/api/cart`, { headers })

// Add to cart
fetch(`${API}/api/cart`, {
  method: 'POST',
  body: JSON.stringify({ sku_id })
})

// Get wishlist
fetch(`${API}/api/wishlist`, { headers })

// Get orders
fetch(`${API}/api/orders`, { headers })
```

### Token Management

Tokens are stored and managed in the component state or local storage:

```javascript
// Store tokens after login
localStorage.setItem('authToken', authToken);
localStorage.setItem('refreshToken', refreshToken);

// Use in requests
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
};
```

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

### Development Workflow

1. **Start the backend server** (port 5000)
2. **Start the frontend server** (port 3000)
3. **Open browser** to http://localhost:3000
4. **Make changes** - Hot reload enabled
5. **Test features** using the UI

### Adding New Features

#### Add a New Component
```jsx
// Create: app/components/NewComponent.jsx
'use client';

import { useState } from 'react';
import { useTheme } from '../providers/ThemeProviders';

export default function NewComponent() {
  const { isDark } = useTheme();
  
  return (
    <div className={isDark ? 'bg-dark' : 'bg-light'}>
      {/* Component content */}
    </div>
  );
}
```

#### Add a New Page
```jsx
// Create: app/new-page/page.js
'use client';

import { useState } from 'react';

export default function NewPage() {
  return (
    <div>
      {/* Page content */}
    </div>
  );
}
```

#### Add API Integration
```javascript
// Create: app/lib/api.js
export async function fetchData(endpoint) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL}${endpoint}`,
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.json();
}
```

### Best Practices

- ✅ Use `'use client'` for client-side components
- ✅ Use Tailwind utilities for styling
- ✅ Handle loading and error states
- ✅ Add proper TypeScript comments
- ✅ Keep components small and focused
- ✅ Use hooks for state management
- ✅ Follow naming conventions

---

## 🐳 Docker

### Building Docker Image

```bash
cd frontend
docker build -t emi-shopping-frontend:1.0 .
```

### Running Container

```bash
docker run \
  -e NEXT_PUBLIC_SHOP_BACKEND_URL=http://backend:5000 \
  -p 3000:3000 \
  emi-shopping-frontend:1.0
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_SHOP_BACKEND_URL: http://backend:5000
    depends_on:
      - backend
```

---

## 📱 Responsive Design

### Breakpoints

The application is fully responsive with Tailwind CSS breakpoints:

| Device | Breakpoint | Tailwind Prefix |
|--------|-----------|-----------------|
| Mobile | < 768px | - (default) |
| Tablet | 768px+ | `md:` |
| Desktop | 1024px+ | `lg:` |

### Mobile-First Approach

```jsx
<div className="
  text-sm md:text-base lg:text-lg
  px-4 md:px-6 lg:px-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
">
  Content
</div>
```

### Mobile Features

- Bottom navigation bar
- Touch-optimized buttons
- Swipe gestures for image slider
- Full-width layout
- Optimized search bar

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_SHOP_BACKEND_URL = https://api.yourdomain.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

### Deploy to Other Platforms

#### Docker + AWS ECS
```bash
# Build image
docker build -t emi-frontend:latest .

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login ...
docker tag emi-frontend:latest [ECR_URI]
docker push [ECR_URI]
```

#### Traditional Server (VPS)
```bash
npm run build
npm install -g pm2
pm2 start npm --name "emi-frontend" -- start
```

### Performance Optimization

- ✅ Image optimization with Next.js Image
- ✅ Code splitting per route
- ✅ CSS purging via Tailwind
- ✅ Static generation where possible
- ✅ Lazy loading for components

---

## 📚 Learning Resources

- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Lucide React:** https://lucide.dev

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to the repository
5. Create a Pull Request

---

## 📝 License

This project is part of the EMI Shopping App project.

---

## 🆘 Support

### Common Issues

**Issue: Port 3000 already in use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

**Issue: Backend connection error**
- Check backend is running on the correct port
- Verify `NEXT_PUBLIC_SHOP_BACKEND_URL` in `.env.local`
- Check CORS configuration in backend

**Issue: Theme not persisting**
- Clear browser cache
- Check localStorage in DevTools
- Verify ThemeProvider is wrapping app

### Contact Support

- 📧 Email: support@emiapp.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

## 👨‍💻 Team

Developed with ❤️ by the EMI Shopping App Team

---

**Stack:** Next.js 16 • React 19 • Tailwind CSS 4 • Lucide React  
**Last Updated:** November 2024  
**Version:** 1.0.0  
**Status:** Production Ready ✅
