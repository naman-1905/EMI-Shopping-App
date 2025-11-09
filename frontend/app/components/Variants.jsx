"use client"
import React, { useState } from 'react';
import { useTheme } from '../providers/ThemeProviders';

const Variants = ({ images = [], variants = [] }) => {
  const { isDark } = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);

  // Generic placeholder images for variants without specific images
  const placeholderVariant2 = 'https://watermark.lovepik.com/photo/20211210/large/lovepik-electronic-products-are-arranged-neatly-picture_501797768.jpg';
  const placeholderVariant3 = 'https://www.retailmba.com/wp-content/uploads/2023/11/wholesale-electronics.jpeg';

  // Create display images array - first image is the actual product, rest are specific placeholders
  const displayImages = images.length > 0 
    ? [
        images[0], // First actual product image
        { id: 'placeholder-2', url: placeholderVariant2 },
        { id: 'placeholder-3', url: placeholderVariant3 }
      ]
    : [
        { id: 'placeholder-1', url: placeholderVariant3 },
        { id: 'placeholder-2', url: placeholderVariant2 },
        { id: 'placeholder-3', url: placeholderVariant3 }
      ];

  // Default placeholder variants
  const defaultVariants = [
    { id: 1, name: 'Black', color: '#000000' },
    { id: 2, name: 'Gray', color: '#808080' },
    { id: 3, name: 'White', color: '#FFFFFF' }
  ];

  const displayVariants = variants.length > 0 ? variants : defaultVariants;

  const handleVariantChange = (index) => {
    setSelectedVariant(index);
    setSelectedImage(index); // Change image when variant changes
  };

  return (
    <div className={`w-full max-w-md p-8 ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
      {/* Main Image Display */}
      <div className={`${isDark ? 'bg-neutral-800' : 'bg-gray-200'} aspect-[4/5] flex items-center justify-center mb-6 rounded-sm overflow-hidden`}>
        <img 
          src={displayImages[selectedImage]?.url || genericPlaceholder}
          alt={`Product view ${selectedImage + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = genericPlaceholder;
          }}
        />
      </div>

      {/* Variant Selection */}
      <div className="flex gap-4 justify-center">
        {displayVariants.map((variant, index) => (
          <button
            key={variant.id}
            onClick={() => handleVariantChange(index)}
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