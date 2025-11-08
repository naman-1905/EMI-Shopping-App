"use client"
import { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, CheckCircle, MapPin, CreditCard, Edit2 } from 'lucide-react';

// Mock theme hook
const useTheme = () => ({ isDark: false });

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
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Vita Serum',
      price: 103,
      originalPrice: 117,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
      category: 'Skincare',
      quantity: 2,
      selectedEMI: null,
    },
    {
      id: 2,
      name: 'Deep Breath',
      price: 79,
      originalPrice: 81,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
      category: 'Wellness',
      quantity: 1,
      selectedEMI: null,
    },
    {
      id: 3,
      name: 'Green Tea Serum',
      price: 95,
      originalPrice: 110,
      image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a2a7c9?w=500',
      category: 'Skincare',
      quantity: 1,
      selectedEMI: null,
    },
  ]);

  // User address
  const [userAddress, setUserAddress] = useState({
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    phone: '+1 (555) 123-4567'
  });

  const [expandedEMI, setExpandedEMI] = useState(null);

  // EMI calculation function
  const getEMIOptions = (price) => [
    { months: 3, monthlyPayment: Math.ceil(price / 3), interestRate: 0 },
    { months: 6, monthlyPayment: Math.ceil((price * 1.05) / 6), interestRate: 5 },
    { months: 9, monthlyPayment: Math.ceil((price * 1.08) / 9), interestRate: 8 },
    { months: 12, monthlyPayment: Math.ceil((price * 1.12) / 12), interestRate: 12 },
  ];

  const updateQuantity = (productId, change) => {
    setCartItems(prev => {
      const item = prev.find(item => item.id === productId);
      
      if (change === -1 && item && item.quantity === 1) {
        return prev.filter(item => item.id !== productId);
      }
      
      return prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
    });
  };

  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const setProductEMI = (productId, months) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, selectedEMI: months }
          : item
      )
    );
    setExpandedEMI(null);
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
      // const response = await fetch('/api/checkout', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     items: cartItems,
      //     total: total,
      //     subtotal: subtotal,
      //     shipping: shipping,
      //     address: userAddress,
      //   }),
      // });
      // const data = await response.json();
      
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
  const cardBg = isDark ? 'bg-neutral-900' : 'bg-gray-50';
  const borderColor = isDark ? 'border-neutral-800' : 'border-gray-200';
  const buttonBg = isDark ? 'bg-white' : 'bg-black';
  const buttonText = isDark ? 'text-black' : 'text-white';
  const buttonHover = isDark ? 'hover:bg-gray-200' : 'hover:bg-gray-800';
  const emptyStateBg = isDark ? 'bg-neutral-800' : 'bg-gray-100';
  const emptyStateIcon = isDark ? 'text-neutral-600' : 'text-gray-300';
  const emiSelectedBorder = isDark ? 'border-white bg-white bg-opacity-5' : 'border-black bg-black bg-opacity-5';
  const emiHoverBorder = isDark ? 'hover:border-neutral-600' : 'hover:border-gray-300';
  const emiDefaultBorder = isDark ? 'border-neutral-700' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Checkout Success Animation Overlay */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm animate-fadeIn">
          <div className="text-center animate-scaleIn">
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto bg-green-500 rounded-full flex items-center justify-center animate-checkmark">
                <CheckCircle size={64} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 w-32 h-32 mx-auto bg-green-500 rounded-full animate-ripple opacity-30"></div>
              <div className="absolute inset-0 w-32 h-32 mx-auto bg-green-500 rounded-full animate-ripple-delay opacity-20"></div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3 animate-slideUp">
              Order Placed!
            </h2>
            <p className="text-xl text-gray-300 animate-slideUp animation-delay-200">
              Thank you for your purchase
            </p>
            <div className="mt-6 flex gap-2 justify-center animate-slideUp animation-delay-400">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-400"></div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* Title */}
        <h1 className={`text-3xl md:text-4xl font-bold ${textColor} mb-8`}>
          Shopping Cart
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const itemTotal = item.price * item.quantity;
                const emiOptions = getEMIOptions(itemTotal);
                const isExpanded = expandedEMI === item.id;
                
                return (
                  <div
                    key={item.id}
                    className={`${cardBg} rounded-2xl p-4`}
                  >
                    <div className="flex gap-4 mb-4">
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className={`text-base md:text-lg font-medium ${textColor} mb-1`}>
                            {item.name}
                          </h3>
                          <p className={`text-sm ${subtextColor}`}>{item.category}</p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className={`flex items-center gap-3 ${cardBg} border ${borderColor} rounded-lg px-3 py-2`}>
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className={`${textColor} hover:opacity-70 transition-opacity`}
                            >
                              <Minus size={16} />
                            </button>
                            <span className={`${textColor} font-medium w-8 text-center`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className={`${textColor} hover:opacity-70 transition-opacity`}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className={`text-lg font-bold ${textColor}`}>
                                ${calculateItemTotal(item)}
                              </div>
                              {item.originalPrice && (
                                <div className={`text-sm ${subtextColor} line-through`}>
                                  ${item.originalPrice * item.quantity}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className={`${subtextColor} hover:text-red-500 transition-colors`}
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* EMI Section for this product */}
                    <div className={`border-t ${borderColor} pt-4`}>
                      <button
                        onClick={() => setExpandedEMI(isExpanded ? null : item.id)}
                        className="w-full flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <CreditCard size={18} className={textColor} />
                          <span className={`text-sm font-medium ${textColor}`}>
                            {item.selectedEMI 
                              ? `EMI: ${item.selectedEMI} months` 
                              : 'Add EMI Plan'}
                          </span>
                        </div>
                        <span className={`text-sm ${subtextColor}`}>
                          {isExpanded ? '▲' : '▼'}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="mt-3 space-y-2">
                          {emiOptions.map((option) => (
                            <label
                              key={option.months}
                              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                                item.selectedEMI === option.months
                                  ? emiSelectedBorder
                                  : `${emiDefaultBorder} ${emiHoverBorder}`
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`emi-${item.id}`}
                                  checked={item.selectedEMI === option.months}
                                  onChange={() => setProductEMI(item.id, option.months)}
                                  className="w-4 h-4"
                                />
                                <div>
                                  <div className={`text-sm font-medium ${textColor}`}>
                                    {option.months} Months
                                  </div>
                                  <div className={`text-xs ${subtextColor}`}>
                                    {option.interestRate === 0 
                                      ? 'No cost EMI' 
                                      : `${option.interestRate}% interest`}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-sm font-bold ${textColor}`}>
                                  ${option.monthlyPayment}/mo
                                </div>
                                <div className={`text-xs ${subtextColor}`}>
                                  ${option.monthlyPayment * option.months}
                                </div>
                              </div>
                            </label>
                          ))}
                          {item.selectedEMI && (
                            <button
                              onClick={() => setProductEMI(item.id, null)}
                              className={`w-full text-sm ${subtextColor} hover:${textColor} transition-colors py-2`}
                            >
                              Pay full amount
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column - Address & Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              {/* Delivery Address */}
              <div className={`${cardBg} rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className={textColor} />
                    <h2 className={`text-lg font-bold ${textColor}`}>
                      Delivery Address
                    </h2>
                  </div>
                  <button className={`${subtextColor} hover:${textColor} transition-colors`}>
                    <Edit2 size={16} />
                  </button>
                </div>
                <div className={`${subtextColor} space-y-1 text-sm`}>
                  <p className={`${textColor} font-medium`}>{userAddress.name}</p>
                  <p>{userAddress.street}</p>
                  <p>{userAddress.city}, {userAddress.state} {userAddress.zipCode}</p>
                  <p>{userAddress.country}</p>
                  <p className="pt-2">{userAddress.phone}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className={`${cardBg} rounded-2xl p-6 sticky top-24`}>
                <h2 className={`text-xl font-bold ${textColor} mb-6`}>
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className={`${subtextColor}`}>Subtotal</span>
                    <span className={`${textColor} font-medium`}>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${subtextColor}`}>Shipping</span>
                    <span className={`${textColor} font-medium`}>${shipping}</span>
                  </div>
                  
                  {cartItems.some(item => item.selectedEMI) && (
                    <div className={`${cardBg} border ${borderColor} rounded-lg p-3 space-y-2`}>
                      <div className={`text-xs font-medium ${textColor} mb-2`}>EMI Plans:</div>
                      {cartItems.filter(item => item.selectedEMI).map(item => {
                        const itemTotal = item.price * item.quantity;
                        const emiOptions = getEMIOptions(itemTotal);
                        const selectedPlan = emiOptions.find(o => o.months === item.selectedEMI);
                        return (
                          <div key={item.id} className={`text-xs ${subtextColor}`}>
                            {item.name} ${selectedPlan?.monthlyPayment} per month, {item.selectedEMI} months
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  <div className={`border-t ${borderColor} pt-4`}>
                    <div className="flex justify-between">
                      <span className={`text-lg font-bold ${textColor}`}>Total</span>
                      <span className={`text-lg font-bold ${textColor}`}>${total}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className={`w-full ${buttonBg} ${buttonText} py-3 rounded-lg font-medium ${buttonHover} transition-colors mb-3`}
                >
                  Proceed to Checkout
                </button>

                <p className={`text-xs ${subtextColor} text-center`}>
                  Taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Empty State
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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }

        .animate-checkmark {
          animation: checkmark 0.6s ease-out;
        }

        .animate-ripple {
          animation: ripple 1.5s ease-out infinite;
        }

        .animate-ripple-delay {
          animation: ripple 1.5s ease-out infinite 0.5s;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: backwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: backwards;
        }
      `}</style>
    </div>
  );
}