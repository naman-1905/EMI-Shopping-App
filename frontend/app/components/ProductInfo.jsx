"use client"
import React, { useState, useEffect } from 'react';
import { Heart, Link2, Check } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';
import { useParams, useRouter } from 'next/navigation';

const ProductInfo = ({ 
  brand = "Apple",
  title = "iPhone 17 Pro Max",
  originalPrice = 123456,
  currentPrice = 123456,
  description = "",
  emiPlans = [],
  onEmiChange // New prop to notify parent of EMI changes
}) => {
  const { isDark } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

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

  // Load saved EMI selection on mount
  useEffect(() => {
    if (params.sku_id) {
      const emiSelections = JSON.parse(localStorage.getItem('emiSelections') || '{}');
      if (emiSelections[params.sku_id]) {
        setSelectedEmiPlan(emiSelections[params.sku_id]);
      }
    }
  }, [params.sku_id]);

  // Handle EMI plan selection
  const handleEmiSelection = (planId) => {
    setSelectedEmiPlan(planId);
    
    // Save to localStorage
    if (params.sku_id) {
      const emiSelections = JSON.parse(localStorage.getItem('emiSelections') || '{}');
      emiSelections[params.sku_id] = planId;
      localStorage.setItem('emiSelections', JSON.stringify(emiSelections));
    }

    // Notify parent component if callback provided
    if (onEmiChange) {
      const selectedPlan = displayEmiPlans.find(p => p.id === planId);
      // Extract months from duration string (e.g., "3 months" -> 3)
      const months = selectedPlan ? parseInt(selectedPlan.duration) : null;
      onEmiChange(months);
    }
  };

  // Add to wishlist handler
  const handleAddToWishlist = async () => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    
    if (!token) {
      alert('Please login to add items to wishlist');
      router.push('/login');
      return;
    }

    try {
      setAddingToWishlist(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL}/api/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          sku_id: params.sku_id
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add to wishlist');
      }

      alert('Item added to wishlist successfully');
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      alert(err.message || 'Failed to add item to wishlist');
    } finally {
      setAddingToWishlist(false);
    }
  };

  // Copy product link handler
  const handleCopyLink = async () => {
    try {
      const productUrl = window.location.href;
      await navigator.clipboard.writeText(productUrl);
      setLinkCopied(true);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Error copying link:', err);
      alert('Failed to copy link');
    }
  };

  return (
    <div className={`w-full max-w-md ${isDark ? 'text-white' : 'text-black'}`}>
      {/* Action Icons */}
      <div className="flex gap-3 mb-4">
        <button 
          onClick={handleAddToWishlist}
          disabled={addingToWishlist}
          className={`w-10 h-10 rounded-full border-2 ${
            isDark 
              ? 'border-white hover:bg-white hover:text-black' 
              : 'border-black hover:bg-black hover:text-white'
          } flex items-center justify-center transition-colors ${
            addingToWishlist ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={20} />
        </button>
        <button 
          onClick={handleCopyLink}
          className={`w-10 h-10 rounded-full border-2 ${
            linkCopied
              ? isDark 
                ? 'bg-white text-black border-white' 
                : 'bg-black text-white border-black'
              : isDark 
                ? 'border-white hover:bg-white hover:text-black' 
                : 'border-black hover:bg-black hover:text-white'
          } flex items-center justify-center transition-colors`}
          aria-label={linkCopied ? "Link copied" : "Share product"}
        >
          {linkCopied ? <Check size={20} /> : <Link2 size={20} />}
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
              onClick={() => handleEmiSelection(plan.id)}
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