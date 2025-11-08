"use client"
import { useState, useEffect } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';
import LoginPromptBox from './LoginModal';
import CartItem from './CartItem';
import DeliveryAddress from './DeliveryAddress';
import OrderSummary from './OrderSummary';
import CheckoutSuccess from './CheckoutSuccess';

// Mock router for demo
const useRouter = () => ({ 
  push: (path) => {
    console.log(`Redirecting to ${path}`);
    window.location.href = path;
  }
});

export default function Cart() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // User address
  const [userAddress] = useState({
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    phone: '+1 (555) 123-4567'
  });

  useEffect(() => {
    checkAuthAndFetchCart();
  }, []);

  const checkAuthAndFetchCart = async () => {
    try {
      // Check for auth tokens
      const authToken = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!authToken || !refreshToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);

      // Fetch cart items
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL}/api/cart`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        // Transform API data to match component structure
        const items = result.data.map((item) => ({
          id: item.sku_id,
          name: item.sku_name,
          price: item.price / 100, // Convert from cents to dollars
          quantity: item.quantity,
          selectedEMI: null,
          // Using placeholder values since API doesn't provide these
          image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
          category: 'Product',
        }));
        
        setCartItems(items);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // EMI calculation function
  const getEMIOptions = (price) => [
    { months: 3, monthlyPayment: Math.ceil(price / 3), interestRate: 0 },
    { months: 6, monthlyPayment: Math.ceil((price * 1.05) / 6), interestRate: 5 },
    { months: 9, monthlyPayment: Math.ceil((price * 1.08) / 9), interestRate: 8 },
    { months: 12, monthlyPayment: Math.ceil((price * 1.12) / 12), interestRate: 12 },
  ];

  const updateQuantity = async (productId, change) => {
    try {
      const item = cartItems.find(item => item.id === productId);
      
      if (!item) return;

      const newQuantity = item.quantity + change;

      // If quantity becomes 0, remove the item
      if (newQuantity === 0) {
        await removeItem(productId);
        return;
      }

      // Optimistically update UI
      setCartItems(prev =>
        prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      // TODO: Call update quantity API when available
    } catch (err) {
      console.error('Error updating quantity:', err);
      // Revert on error
      checkAuthAndFetchCart();
    }
  };

  const removeItem = async (productId) => {
    try {
      // Optimistically update UI
      setCartItems(prev => prev.filter(item => item.id !== productId));

      // TODO: Call remove from cart API when available
    } catch (err) {
      console.error('Error removing item:', err);
      // Revert on error
      checkAuthAndFetchCart();
    }
  };

  const setProductEMI = (productId, months) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, selectedEMI: months }
          : item
      )
    );
  };

  const calculateItemTotal = (item) => {
    const basePrice = item.price * item.quantity;
    if (!item.selectedEMI) return basePrice;
    
    const emiOptions = getEMIOptions(basePrice);
    const selectedPlan = emiOptions.find(o => o.months === item.selectedEMI);
    return selectedPlan ? selectedPlan.monthlyPayment * selectedPlan.months : basePrice;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const shipping = 10;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setShowCheckout(true);
    
    try {
      // TODO: Replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTimeout(() => {
        router.push('/profile');
      }, 5000);
      
    } catch (error) {
      console.error('Error during checkout:', error);
      setShowCheckout(false);
      alert('An error occurred. Please try again.');
    }
  };

  // Theme colors
  const bgColor = isDark ? 'bg-neutral-950' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const buttonBg = isDark ? 'bg-white' : 'bg-black';
  const buttonText = isDark ? 'text-black' : 'text-white';
  const buttonHover = isDark ? 'hover:bg-gray-200' : 'hover:bg-gray-800';
  const emptyStateBg = isDark ? 'bg-neutral-800' : 'bg-gray-100';
  const emptyStateIcon = isDark ? 'text-neutral-600' : 'text-gray-300';

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Checkout Success Animation Overlay */}
      {showCheckout && <CheckoutSuccess />}

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* Title */}
        <h1 className={`text-3xl md:text-4xl font-bold ${textColor} mb-8`}>
          Shopping Cart
        </h1>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className={`animate-spin ${subtextColor}`} size={40} />
          </div>
        )}

        {/* Not Authenticated - Show Login Prompt */}
        {!isLoading && !isAuthenticated && (
          <div className="py-8 max-w-md mx-auto">
            <LoginPromptBox />
          </div>
        )}

        {/* Error State */}
        {!isLoading && isAuthenticated && error && (
          <div className="text-center py-16">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center
              ${isDark ? "bg-red-900/20" : "bg-red-100"}`}>
              <ShoppingBag size={40} className="text-red-500" />
            </div>
            <h2 className={`text-xl font-semibold ${textColor} mb-2`}>
              Oops! Something went wrong
            </h2>
            <p className={`${subtextColor} mb-4`}>{error}</p>
            <button
              onClick={checkAuthAndFetchCart}
              className={`px-6 py-2 rounded-lg font-medium transition-colors
                ${isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Cart Items */}
        {!isLoading && isAuthenticated && !error && cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                  onSetEMI={setProductEMI}
                />
              ))}
            </div>

            {/* Right Column - Address & Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              <DeliveryAddress address={userAddress} />
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}

        {/* Empty Cart State */}
        {!isLoading && isAuthenticated && !error && cartItems.length === 0 && (
          <div className="text-center py-16">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full ${emptyStateBg} flex items-center justify-center`}>
              <ShoppingBag size={40} className={emptyStateIcon} />
            </div>
            <h2 className={`text-xl font-semibold ${textColor} mb-2`}>Your cart is empty</h2>
            <p className={`${subtextColor} mb-6`}>Add some products to get started!</p>
            <button className={`${buttonBg} ${buttonText} px-6 py-3 rounded-lg font-medium ${buttonHover} transition-colors`}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}