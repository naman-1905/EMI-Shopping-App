"use client"
import React, { useState } from 'react';
import { useTheme } from '../providers/ThemeProviders';

const Variants = ({ images = [], variants = [] }) => {
  const { isDark } = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);

  // Default placeholder images if none provided
  const defaultImages = [
    { id: 1, url: 'https://via.placeholder.com/400x500/e0e0e0/666666?text=Product+Image+1' },
    { id: 2, url: 'https://via.placeholder.com/400x500/e0e0e0/666666?text=Product+Image+2' },
    { id: 3, url: 'https://via.placeholder.com/400x500/e0e0e0/666666?text=Product+Image+3' }
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  // Default placeholder variants if none provided
  const defaultVariants = [
    { id: 1, name: 'Black', color: '#000000' },
    { id: 2, name: 'Gray', color: '#808080' },
    { id: 3, name: 'White', color: '#FFFFFF' }
  ];

  const displayVariants = variants.length > 0 ? variants : defaultVariants;

  return (
    <div className={`w-full max-w-md p-8 ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
      {/* Main Image Display */}
      <div className={`${isDark ? 'bg-neutral-800' : 'bg-gray-200'} aspect-[4/5] flex items-center justify-center mb-6 rounded-sm overflow-hidden`}>
        <img 
          src={displayImages[selectedImage]?.url || displayImages[0].url}
          alt={`Product view ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Variant Selection */}
      <div className="flex gap-4 justify-center">
        {displayVariants.map((variant, index) => (
          <button
            key={variant.id}
            onClick={() => setSelectedVariant(index)}
            className={`w-14 h-14 rounded-full border-2 transition-all ${
              selectedVariant === index 
                ? `${isDark ? 'border-white' : 'border-black'} scale-110` 
                : `${isDark ? 'border-neutral-600 hover:border-neutral-500' : 'border-gray-300 hover:border-gray-400'}`
            }`}
            style={{ backgroundColor: variant.color }}
            aria-label={`Select ${variant.name} variant`}
          >
            {variant.color === '#FFFFFF' && (
              <span className="sr-only">{variant.name}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Variants;