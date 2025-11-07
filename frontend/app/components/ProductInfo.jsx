"use client"
import React, { useState } from 'react';
import { Heart, Link2 } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

const ProductInfo = ({ 
  brand = "Apple",
  title = "iPhone 17 Pro Max",
  originalPrice = 123456,
  currentPrice = 123456,
  description = "",
  emiPlans = []
}) => {
  const { isDark } = useTheme();
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);

  // Default EMI plans if none provided
  const defaultEmiPlans = [
    { id: 1, duration: '3 months', amount: 41152 },
    { id: 2, duration: '6 months', amount: 20576 },
    { id: 3, duration: '9 months', amount: 13717 },
    { id: 4, duration: '12 months', amount: 10288 },
    { id: 5, duration: '18 months', amount: 6859 },
    { id: 6, duration: '24 months', amount: 5144 }
  ];

  const displayEmiPlans = emiPlans.length > 0 ? emiPlans : defaultEmiPlans;

  return (
    <div className={`w-full max-w-md ${isDark ? 'text-white' : 'text-black'}`}>
      {/* Action Icons */}
      <div className="flex gap-3 mb-4">
        <button 
          className={`w-10 h-10 rounded-full border-2 ${
            isDark 
              ? 'border-white hover:bg-white hover:text-black' 
              : 'border-black hover:bg-black hover:text-white'
          } flex items-center justify-center transition-colors`}
          aria-label="Add to wishlist"
        >
          <Heart size={20} />
        </button>
        <button 
          className={`w-10 h-10 rounded-full border-2 ${
            isDark 
              ? 'border-white hover:bg-white hover:text-black' 
              : 'border-black hover:bg-black hover:text-white'
          } flex items-center justify-center transition-colors`}
          aria-label="Share product"
        >
          <Link2 size={20} />
        </button>
      </div>

      {/* Brand */}
      <div className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {brand}
      </div>

      {/* Product Title */}
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {/* Price */}
      <div className="flex items-center gap-3 mb-6">
        {originalPrice > currentPrice && (
          <span className={`line-through text-lg ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            ₹ {originalPrice.toLocaleString()}
          </span>
        )}
        <span className="text-3xl font-bold">
          ₹ {currentPrice.toLocaleString()}
        </span>
      </div>

      {/* Description */}
      {description && (
        <div className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <p>{description}</p>
        </div>
      )}

      {/* EMI Plans */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4">EMI plans:</h3>
        <div className="grid grid-cols-2 gap-3">
          {displayEmiPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedEmiPlan(plan.id)}
              className={`p-4 rounded border-2 transition-all text-left ${
                selectedEmiPlan === plan.id
                  ? `${isDark ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`
                  : `${isDark ? 'border-neutral-700 bg-neutral-800 hover:border-neutral-600' : 'border-gray-300 bg-gray-200 hover:border-gray-400'}`
              }`}
            >
              <div className="font-semibold text-sm">{plan.duration}</div>
              <div className="text-lg font-bold mt-1">
                ₹{plan.amount.toLocaleString()}/mo
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;