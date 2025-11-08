"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../providers/ThemeProviders';

export default function BestSellingProducts({ selectedCategory }) {
  const { isDark } = useTheme();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL}/api/featured/skus`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setProducts(result.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Navigate to product page
  const handleProductClick = (skuId) => {
    router.push(`/product/${skuId}`);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' || !selectedCategory
    ? products
    : products.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  // Theme colors
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-gray-900' : 'bg-gray-100';

  // Loading state
  if (loading) {
    return (
      <div className={`w-full ${bgColor} py-12 px-4 md:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className={`h-10 w-64 ${cardBg} rounded animate-pulse mb-2`}></div>
            <div className={`h-6 w-32 ${cardBg} rounded animate-pulse`}></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className={`aspect-square ${cardBg} rounded-lg animate-pulse`}></div>
                <div className={`h-4 ${cardBg} rounded animate-pulse`}></div>
                <div className={`h-6 w-24 ${cardBg} rounded animate-pulse`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`w-full ${bgColor} py-12 px-4 md:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className={`${subtextColor} text-lg mb-4`}>
              Failed to load products: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className={`px-6 py-2 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} rounded-lg hover:opacity-80 transition-opacity`}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${bgColor} py-12 px-4 md:px-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-2`}>
            {selectedCategory === 'all' || !selectedCategory
              ? 'Best Selling Products' 
              : `${selectedCategory.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Collection`}
          </h2>
          <p className={subtextColor}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.sku_id}
              onClick={() => handleProductClick(product.sku_id)}
              className="group cursor-pointer"
            >
              {/* Product Image */}
              <div className={`relative aspect-square mb-3 overflow-hidden rounded-lg ${cardBg}`}>
                {product.sku_image_handler?.product_image_1_url ? (
                  <img
                    src={product.sku_image_handler.product_image_1_url}
                    alt={product.sku_name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${cardBg}`}>
                    <span className={subtextColor}>No Image</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <h3 className={`text-sm md:text-base font-medium ${textColor} line-clamp-2`}>
                  {product.sku_name}
                </h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className={`text-lg font-bold ${textColor}`}>
                    ₹{(product.price / 100).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className={`${subtextColor} text-lg`}>
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}