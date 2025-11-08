"use client"
import { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Loader2 } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';
import LoginPromptBox from './LoginModal';

export default function WishlistProducts() {
  const { isDark } = useTheme();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthAndFetchWishlist();
  }, []);

  const checkAuthAndFetchWishlist = async () => {
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

      // Fetch wishlist
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL}/api/wishlist`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        // Transform API data to match component structure
        const products = result.data.map((item, index) => ({
          id: item.sku_id,
          name: item.sku_name,
          price: item.price / 100, // Convert from cents to dollars
          brand: item.sku_brand,
          image: item.sku_image_handler?.product_image_1_url || '',
          category: item.category,
          description: item.sku_description,
          quantity: item.quantity,
          specialTag: item.special_tag,
          bestSelling: item.best_selling
        }));
        
        setWishlistProducts(products);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching wishlist:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const authToken = localStorage.getItem('authToken');
      
      // Optimistically update UI
      const previousProducts = wishlistProducts;
      setWishlistProducts(prev => prev.filter(p => p.id !== productId));

      // Call remove from wishlist API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL}/api/wishlist`,
        {
          method: 'DELETE',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            sku_id: productId
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove item from wishlist');
      }

      const result = await response.json();
      console.log(result.message); // "Item removed from wishlist successfully"
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      // Revert UI on error
      setWishlistProducts(previousProducts);
    }
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
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className={`animate-spin ${subtextColor}`} size={40} />
          </div>
        )}

        {/* Not Authenticated - Show Login Prompt */}
        {!isLoading && !isAuthenticated && (
          <div className="py-8">
            <LoginPromptBox />
          </div>
        )}

        {/* Error State */}
        {!isLoading && isAuthenticated && error && (
          <div className="text-center py-16">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center
              ${isDark ? "bg-red-900/20" : "bg-red-100"}`}>
              <Heart size={40} className="text-red-500" />
            </div>
            <h2 className={`text-xl font-semibold ${textColor} mb-2`}>
              Oops! Something went wrong
            </h2>
            <p className={`${subtextColor} mb-4`}>{error}</p>
            <button
              onClick={checkAuthAndFetchWishlist}
              className={`px-6 py-2 rounded-lg font-medium transition-colors
                ${isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Wishlist Products */}
        {!isLoading && isAuthenticated && !error && wishlistProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Product Image */}
                <div className={`relative aspect-square mb-3 overflow-hidden rounded-2xl ${cardBg}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Special Tag Badge */}
                  {product.specialTag && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      SPECIAL
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(product.id);
                    }}
                    className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform
                      ${isDark ? "bg-neutral-800" : "bg-white"} hover:scale-110`}
                  >
                    <Heart
                      size={18}
                      className={isDark ? "fill-white text-white" : "fill-black text-black"}
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
                  <p className={`text-xs ${subtextColor} uppercase tracking-wide`}>
                    {product.brand}
                  </p>
                  <h3 className={`text-sm md:text-base font-medium ${textColor} line-clamp-2`}>
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${textColor}`}>
                      ${product.price.toFixed(2)}
                    </span>
                    {product.bestSelling && (
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                        BESTSELLER
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Wishlist State */}
        {!isLoading && isAuthenticated && !error && wishlistProducts.length === 0 && (
          <div className="text-center py-16">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center
              ${isDark ? "bg-neutral-800" : "bg-gray-100"}`}>
              <Heart size={40} className={`${isDark ? "text-gray-500" : "text-gray-300"}`} />
            </div>
            <h2 className={`text-xl font-semibold ${textColor} mb-2`}>
              Your wishlist is empty
            </h2>
            <p className={`${subtextColor}`}>Start adding products you love!</p>
          </div>
        )}
      </div>
    </div>
  );
}