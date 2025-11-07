"use client"
import { useTheme } from '../providers/ThemeProviders';

export default function BestSellingProducts({ selectedCategory }) {
  const { isDark } = useTheme();

  const products = [
    {
      id: 1,
      name: 'T-shirt on Rock',
      price: 199.99,
      originalPrice: 300.00,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      category: 1, // Fashion
    },
    {
      id: 2,
      name: 'Black Puffer Jacket',
      price: 899.99,
      originalPrice: 999.99,
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500',
      category: 3, // Outerwear
    },
    {
      id: 3,
      name: 'Sneakers White x Brown',
      price: 599.99,
      originalPrice: 800.00,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
      category: 2, // Footwear
    },
    {
      id: 4,
      name: 'Green Corduroy Hoodie',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
      category: 1, // Fashion
    },
    {
      id: 5,
      name: 'White Joggers',
      price: 149.99,
      originalPrice: 200.00,
      image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500',
      category: 5, // Sportswear
    },
    {
      id: 6,
      name: 'Beige Fedora Hat',
      price: 89.99,
      originalPrice: 120.00,
      image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=500',
      category: 4, // Accessories
    },
    {
      id: 7,
      name: 'Vintage Graphic Sweatshirt',
      price: 179.99,
      originalPrice: 250.00,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
      category: 1, // Fashion
    },
    {
      id: 8,
      name: 'Colorblock Track Pants',
      price: 249.99,
      originalPrice: 349.99,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
      category: 5, // Sportswear
    },
  ];

  // Filter products based on selected category
  // If category is 0 (All) or null, show all products
  const filteredProducts = selectedCategory === 0 || selectedCategory === null
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Theme colors
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-gray-900' : 'bg-gray-100';

  return (
    <div className={`w-full ${bgColor} py-12 px-4 md:px-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-2`}>
            {selectedCategory === 0 || selectedCategory === null 
              ? 'Best Selling Products' 
              : 'Top Picks for You'}
          </h2>
          <p className={subtextColor}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
            >
              {/* Product Image */}
              <div className={`relative aspect-square mb-3 overflow-hidden rounded-lg ${cardBg}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-1">
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className={`${subtextColor} text-lg`}>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}