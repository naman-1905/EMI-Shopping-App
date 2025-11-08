"use client"
import { useState, useEffect } from 'react';
import { ShoppingBag, Loader2, Trash2, X } from 'lucide-react';
import LoginPromptBox from './LoginModal';

// Mock theme provider
const useTheme = () => ({ isDark: false });

// Mock router
const useRouter = () => ({ 
  push: (path) => {
    console.log(`Redirecting to ${path}`);
    window.location.href = path;
  }
});

// Cart Item Component
function CartItem({ item, onRemoveItem, onSetEMI }) {
  const { isDark } = useTheme();
  const [showEMI, setShowEMI] = useState(false);

  const getEMIOptions = (price) => [
    { months: 3, monthlyPayment: Math.ceil(price / 3), interestRate: 0 },
    { months: 6, monthlyPayment: Math.ceil((price * 1.05) / 6), interestRate: 5 },
    { months: 9, monthlyPayment: Math.ceil((price * 1.08) / 9), interestRate: 8 },
    { months: 12, monthlyPayment: Math.ceil((price * 1.12) / 12), interestRate: 12 },
  ];

  const emiOptions = getEMIOptions(item.price);

  return (
    <div className={`p-6 rounded-xl ${isDark ? 'bg-neutral-800' : 'bg-gray-50'} transition-all`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                {item.sku_name}
              </h3>
            </div>
            <button
              onClick={() => onRemoveItem(item.sku_id)}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-neutral-700 text-gray-400 hover:text-red-400' 
                  : 'hover:bg-gray-200 text-gray-500 hover:text-red-500'
              }`}
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="mb-4">
            <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₹{item.price.toLocaleString()}
            </span>
          </div>

          {/* EMI Section */}
          <div className="space-y-3">
            <button
              onClick={() => setShowEMI(!showEMI)}
              className={`text-sm font-medium ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              {showEMI ? 'Hide' : 'View'} EMI Options
            </button>

            {showEMI && (
              <div className={`p-4 rounded-lg ${isDark ? 'bg-neutral-900' : 'bg-white'} space-y-2`}>
                {emiOptions.map((option) => (
                  <button
                    key={option.months}
                    onClick={() => onSetEMI(item.sku_id, option.months)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      item.selectedEMI === option.months
                        ? isDark
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-600 text-white'
                        : isDark
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{option.months} Months</span>
                      <span className="font-bold">₹{option.monthlyPayment.toLocaleString()}/mo</span>
                    </div>
                    <div className={`text-xs mt-1 ${
                      item.selectedEMI === option.months
                        ? 'text-blue-100'
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {option.interestRate}% interest • Total: ₹{(option.monthlyPayment * option.months).toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {item.selectedEMI && (
              <div className={`flex items-center justify-between p-3 rounded-lg ${
                isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
              }`}>
                <span className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                  Selected: {item.selectedEMI} months EMI
                </span>
                <button
                  onClick={() => onSetEMI(item.sku_id, null)}
                  className={`text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Delivery Address Component with selection
function DeliveryAddress({ addresses, selectedAddressId, onSelectAddress, isLoading }) {
  const { isDark } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const selectedAddress = addresses.find(addr => addr.ad_id === selectedAddressId);
  
  return (
    <div className={`p-6 rounded-xl ${isDark ? 'bg-neutral-800' : 'bg-gray-50'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Delivery Address
      </h3>
      
      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="animate-spin text-gray-400" size={24} />
        </div>
      ) : addresses.length === 0 ? (
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          No addresses found. Please add an address first.
        </p>
      ) : (
        <div className="space-y-3">
          {/* Selected Address Display */}
          {selectedAddress && (
            <div className={`p-4 rounded-lg border-2 ${isDark ? 'border-blue-500 bg-neutral-900' : 'border-blue-500 bg-blue-50'}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedAddress.receivers_name}
                  </p>
                  {selectedAddress.special_address && (
                    <span className={`inline-block mt-1 text-xs px-2 py-1 rounded ${isDark ? 'bg-neutral-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      {selectedAddress.special_address}
                    </span>
                  )}
                </div>
              </div>
              <div className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>{selectedAddress.flat_house}</p>
                <p>{selectedAddress.landmark}</p>
                <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                <p className="pt-1">{selectedAddress.phone_number}</p>
              </div>
              {addresses.length > 1 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`mt-3 text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  {isExpanded ? 'Hide' : 'Change Address'}
                </button>
              )}
            </div>
          )}
          
          {/* Address Selection List */}
          {isExpanded && (
            <div className="space-y-2 mt-3">
              {addresses.filter(addr => addr.ad_id !== selectedAddressId).map((address) => (
                <button
                  key={address.ad_id}
                  onClick={() => {
                    onSelectAddress(address.ad_id);
                    setIsExpanded(false);
                  }}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    isDark 
                      ? 'border-neutral-700 bg-neutral-900 hover:border-blue-500' 
                      : 'border-gray-200 bg-white hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {address.receivers_name}
                      </p>
                      {address.special_address && (
                        <span className={`inline-block mt-1 text-xs px-2 py-1 rounded ${isDark ? 'bg-neutral-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                          {address.special_address}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`text-sm space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>{address.flat_house}</p>
                    <p>{address.landmark}</p>
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                    <p className="pt-1">{address.phone_number}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Order Summary Component
function OrderSummary({ cartItems, subtotal, shipping, total, totalInterest, onCheckout, isCheckingOut, hasAddress }) {
  const { isDark } = useTheme();

  return (
    <div className={`p-6 rounded-xl ${isDark ? 'bg-neutral-800' : 'bg-gray-50'} sticky top-4`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Order Summary
      </h3>
      
      <div className="space-y-3 mb-4">
        <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <span>Subtotal ({cartItems.length} items)</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <span>Shipping</span>
          <span>₹{shipping.toLocaleString()}</span>
        </div>
        <div className={`pt-3 border-t ${isDark ? 'border-neutral-700' : 'border-gray-200'}`}>
          <div className={`flex justify-between text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={isCheckingOut || !hasAddress || cartItems.length === 0}
        className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
          isCheckingOut || !hasAddress || cartItems.length === 0
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : isDark 
            ? 'bg-white text-black hover:bg-gray-200' 
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {isCheckingOut ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Placing Orders...
          </>
        ) : (
          'Place Order'
        )}
      </button>
      
      {!hasAddress && cartItems.length > 0 && (
        <p className={`text-xs mt-2 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Please select a delivery address
        </p>
      )}
    </div>
  );
}

// Checkout Success Component
function CheckoutSuccess({ orderCount }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {orderCount > 1 ? `${orderCount} Orders` : 'Order'} Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Redirecting to your orders...</p>
        <Loader2 className="animate-spin text-gray-400 mx-auto" size={32} />
      </div>
    </div>
  );
}

// Main Cart Component
export default function Cart() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthAndFetchCart();
  }, []);

  const checkAuthAndFetchCart = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!authToken || !refreshToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);

      // Fetch cart items
      const cartResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL || 'https://1fib.halfskirmish.com'}/api/cart`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      if (!cartResponse.ok) {
        throw new Error('Failed to fetch cart');
      }

      const cartResult = await cartResponse.json();
      
      if (cartResult.success && cartResult.data) {
        // Get stored EMI selections from localStorage
        const emiSelections = JSON.parse(localStorage.getItem('emiSelections') || '{}');
        
        const items = cartResult.data.map((item) => ({
          sku_id: item.sku_id,
          sku_name: item.sku_info?.sku_name || 'Unknown Product',
          price: item.sku_info?.price || 0,
          selectedEMI: emiSelections[item.sku_id] || null, // Apply stored EMI selection
        }));
        
        setCartItems(items);
      }

      // Fetch addresses
      setIsAddressLoading(true);
      const addressResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL || 'https://1fib.halfskirmish.com'}/api/address`,
        {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      if (!addressResponse.ok) {
        throw new Error('Failed to fetch addresses');
      }

      const addressResult = await addressResponse.json();
      
      if (addressResult.success && addressResult.addresses) {
        setAddresses(addressResult.addresses);
        // Auto-select first address if available
        if (addressResult.addresses.length > 0) {
          setSelectedAddressId(addressResult.addresses[0].ad_id);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
      setIsAddressLoading(false);
    }
  };

  const getEMIOptions = (price) => [
    { months: 3, monthlyPayment: Math.ceil(price / 3), interestRate: 0 },
    { months: 6, monthlyPayment: Math.ceil((price * 1.05) / 6), interestRate: 5 },
    { months: 9, monthlyPayment: Math.ceil((price * 1.08) / 9), interestRate: 8 },
    { months: 12, monthlyPayment: Math.ceil((price * 1.12) / 12), interestRate: 12 },
  ];

  const removeItem = async (sku_id) => {
    try {
      const authToken = localStorage.getItem('authToken');
      
      setCartItems(prev => prev.filter(item => item.sku_id !== sku_id));

      // Remove from localStorage EMI selections
      const emiSelections = JSON.parse(localStorage.getItem('emiSelections') || '{}');
      delete emiSelections[sku_id];
      localStorage.setItem('emiSelections', JSON.stringify(emiSelections));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL || 'https://1fib.halfskirmish.com'}/api/cart`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ sku_id })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }
    } catch (err) {
      console.error('Error removing item:', err);
      checkAuthAndFetchCart();
    }
  };

  const setProductEMI = (sku_id, months) => {
    setCartItems(prev => 
      prev.map(item => 
        item.sku_id === sku_id 
          ? { ...item, selectedEMI: months }
          : item
      )
    );
    
    // Save to localStorage
    const emiSelections = JSON.parse(localStorage.getItem('emiSelections') || '{}');
    if (months === null) {
      delete emiSelections[sku_id];
    } else {
      emiSelections[sku_id] = months;
    }
    localStorage.setItem('emiSelections', JSON.stringify(emiSelections));
  };

  const calculateItemTotal = (item) => {
    const basePrice = item.price;
    if (!item.selectedEMI) return basePrice;
    
    const emiOptions = getEMIOptions(basePrice);
    const selectedPlan = emiOptions.find(o => o.months === item.selectedEMI);
    return selectedPlan ? selectedPlan.monthlyPayment * selectedPlan.months : basePrice;
  };

  const calculateItemInterest = (item) => {
    if (!item.selectedEMI) return 0;
    
    const emiOptions = getEMIOptions(item.price);
    const selectedPlan = emiOptions.find(o => o.months === item.selectedEMI);
    if (!selectedPlan) return 0;
    
    return (selectedPlan.monthlyPayment * selectedPlan.months) - item.price;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalInterest = cartItems.reduce((sum, item) => sum + calculateItemInterest(item), 0);
  const shipping = 10;
  const total = subtotal + totalInterest + shipping;

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }

    setIsCheckingOut(true);
    
    try {
      const authToken = localStorage.getItem('authToken');
      const baseUrl = process.env.NEXT_PUBLIC_SHOP_BACKEND_URL || 'https://1fib.halfskirmish.com';
      
      // Calculate expected delivery date (7 days from now)
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 7);
      const exDeliveryDate = deliveryDate.toISOString().split('T')[0];

      // Create orders for each cart item
      const orderPromises = cartItems.map(async (item) => {
        const orderData = {
          ad_id: selectedAddressId,
          sku_id: item.sku_id,
          ex_delivery_date: exDeliveryDate,
          cash: !item.selectedEMI,
          mutual_fund_emi: false,
          emi: !!item.selectedEMI,
          planned_month: item.selectedEMI || 0,
          quantity: 1,
          final_price: calculateItemTotal(item)
        };

        const response = await fetch(`${baseUrl}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(orderData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create order');
        }

        return response.json();
      });

      await Promise.all(orderPromises);
      
      // Clear cart after successful orders
      const deletePromises = cartItems.map(item => 
        fetch(`${baseUrl}/api/cart`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ sku_id: item.sku_id })
        })
      );

      await Promise.all(deletePromises);

      // Clear EMI selections from localStorage for purchased items
      const emiSelections = JSON.parse(localStorage.getItem('emiSelections') || '{}');
      cartItems.forEach(item => {
        delete emiSelections[item.sku_id];
      });
      localStorage.setItem('emiSelections', JSON.stringify(emiSelections));

      setShowCheckout(true);
      setCartItems([]);
      
      setTimeout(() => {
        router.push('/profile');
      }, 3000);
      
    } catch (error) {
      console.error('Error during checkout:', error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsCheckingOut(false);
    }
  };

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
      {showCheckout && <CheckoutSuccess orderCount={cartItems.length} />}

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        <h1 className={`text-3xl md:text-4xl font-bold ${textColor} mb-8`}>
          Shopping Cart
        </h1>

        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className={`animate-spin ${subtextColor}`} size={40} />
          </div>
        )}

        {!isLoading && !isAuthenticated && (
          <div className="py-8 max-w-md mx-auto">
            <LoginPromptBox />
          </div>
        )}

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

        {!isLoading && isAuthenticated && !error && cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.sku_id}
                  item={item}
                  onRemoveItem={removeItem}
                  onSetEMI={setProductEMI}
                />
              ))}
            </div>

            <div className="lg:col-span-1 space-y-6">
              <DeliveryAddress 
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
                isLoading={isAddressLoading}
              />
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                totalInterest={totalInterest}
                onCheckout={handleCheckout}
                isCheckingOut={isCheckingOut}
                hasAddress={!!selectedAddressId}
              />
            </div>
          </div>
        )}

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