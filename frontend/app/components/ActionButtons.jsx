"use client"
import React from 'react';
import { useTheme } from '../providers/ThemeProviders';

const ActionButtons = ({ 
  onCheckout, 
  onAddToCart, 
  disabled = false 
}) => {
  const { isDark } = useTheme();

  return (
    <div className="flex gap-4 w-full max-w-md">
      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={disabled}
        className={`flex-1 px-8 py-3 rounded-full font-semibold transition-all ${
          disabled 
            ? `${isDark ? 'bg-neutral-700 text-neutral-500' : 'bg-gray-400 text-gray-300'} cursor-not-allowed` 
            : `${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} active:scale-95`
        }`}
      >
        CHECKOUT
      </button>

      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        disabled={disabled}
        className={`flex-1 px-8 py-3 rounded-full font-semibold border-2 transition-all ${
          disabled 
            ? `${isDark ? 'border-neutral-700 text-neutral-600' : 'border-gray-400 text-gray-400'} cursor-not-allowed` 
            : `${isDark 
                ? 'border-white text-white bg-neutral-950 hover:bg-white hover:text-black' 
                : 'border-black text-black bg-white hover:bg-black hover:text-white'
              } active:scale-95`
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ActionButtons;