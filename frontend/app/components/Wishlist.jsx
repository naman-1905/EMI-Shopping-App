"use client"
import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

export default function WishlistProducts() {
  const { isDark } = useTheme(); //
  const [wishlistedItems, setWishlistedItems] = useState([1, 2, 3, 4, 5, 6]);

  const products = [
    {
      id: 1,
      name: 'Vita Serum',
      price: 103,
      originalPrice: 117,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
      category: 'Skincare',
    },
    {
      id: 2,
      name: 'Deep Breath',
      price: 79,
      originalPrice: 81,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
      category: 'Wellness',
    },
    {
      id: 3,
      name: 'Moisturizing Cream',
      price: 103,
      originalPrice: 117,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500',
      category: 'Skincare',
    },
    {
      id: 4,
      name: 'Deep Breath Essential Oil',
      price: 79,
      originalPrice: 81,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500',
      category: 'Wellness',
    },
    {
      id: 5,
      name: 'Green Tea Serum',
      price: 95,
      originalPrice: 110,
      image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a2a7c9?w=500',
      category: 'Skincare',
    },
    {
      id: 6,
      name: 'Rose Gold Essence',
      price: 125,
      originalPrice: 145,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500',
      category: 'Premium',
    },
  ];

  // Filter only wishlisted products
  const wishlistProducts = products.filter(product => wishlistedItems.includes(product.id));

  const toggleWishlist = (productId) => {
    setWishlistedItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Theme-based classes
  const bgColor = isDark ? 'bg-neutral-950' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-neutral-900' : 'bg-gray-50';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>

        {/* Title */}
        <h1 className={`text-3xl md:text-4xl flex justify-center p-4 font-bold ${textColor} mb-8`}>
          Your Wishlist
        </h1>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                
                {/* Product Image */}
                <div className={`relative aspect-square mb-3 overflow-hidden rounded-2xl ${cardBg}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/*Wish Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform
                      ${isDark ? "bg-neutral-800" : "bg-white"} hover:scale-110`}
                  >
                    <Heart
                      size={18}
                      className={
                        wishlistedItems.includes(product.id)
                          ? `${isDark ? "fill-white text-white" : "fill-black text-black"}`
                          : `${isDark ? "text-gray-500" : "text-gray-400"}`
                      }
                    />
                  </button>

                  {/* Add to Cart */}
                  <button
                    className={`absolute bottom-3 right-3 w-8 h-8 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform
                      ${isDark ? "bg-white/20" : "bg-black"}`}
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-1 px-1">
                  <h3 className={`text-sm md:text-base font-medium ${textColor} line-clamp-2`}>
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${textColor}`}>
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className={`text-sm ${subtextColor} line-through`}>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          //Empty State
          <div className="text-center py-16">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center
              ${isDark ? "bg-neutral-800" : "bg-gray-100"}`}>
              <Heart size={40} className={`${isDark ? "text-gray-500" : "text-gray-300"}`} />
            </div>
            <h2 className={`text-xl font-semibold ${textColor} mb-2`}>Your wishlist is empty</h2>
            <p className={`${subtextColor}`}>Start adding products you love!</p>
          </div>
        )}

      </div>
    </div>
  );
}
