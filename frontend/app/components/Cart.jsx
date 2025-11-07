"use client"
import { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

export default function Cart() {
  const { isDark } = useTheme();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Vita Serum',
      price: 103,
      originalPrice: 117,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
      category: 'Skincare',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Deep Breath',
      price: 79,
      originalPrice: 81,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
      category: 'Wellness',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Green Tea Serum',
      price: 95,
      originalPrice: 110,
      image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a2a7c9?w=500',
      category: 'Skincare',
      quantity: 1,
    },
  ]);

  const updateQuantity = (productId, change) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10;
  const total = subtotal + shipping;

  // Theme colors
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* Title */}
        <h1 className={`text-3xl md:text-4xl font-bold ${textColor} mb-8`}>
          Shopping Cart
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`${cardBg} rounded-2xl p-4 flex gap-4`}
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-base md:text-lg font-medium ${textColor} mb-1`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm ${subtextColor}`}>{item.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
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

                      {/* Price & Remove */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-lg font-bold ${textColor}`}>
                            ${item.price * item.quantity}
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
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
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
                  <div className={`border-t ${borderColor} pt-4`}>
                    <div className="flex justify-between">
                      <span className={`text-lg font-bold ${textColor}`}>Total</span>
                      <span className={`text-lg font-bold ${textColor}`}>${total}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Proceed to Checkout
                </button>

                <p className={`text-xs ${subtextColor} text-center mt-4`}>
                  Taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
              <ShoppingBag size={40} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
            </div>
            <h2 className={`text-xl font-semibold ${textColor} mb-2`}>Your cart is empty</h2>
            <p className={`${subtextColor} mb-6`}>Add some products to get started!</p>
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}