'use client';

import { useTheme } from '../providers/ThemeProviders';
import { useState, useEffect } from 'react';

export default function CategoryCircles({ selectedCategory, onCategorySelect }) {
  const { isDark } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL}/api/featured/categories`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          // Group products by category and get one image per category
          const categoryMap = new Map();
          
          result.data.forEach(item => {
            const categoryName = item.category;
            if (!categoryMap.has(categoryName) && item.sku_image_handler?.featured_image_url) {
              categoryMap.set(categoryName, {
                id: categoryName.toLowerCase().replace(/\s+/g, '-'),
                name: categoryName.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                image: item.sku_image_handler.featured_image_url
              });
            }
          });

          // Convert to array and add "All" category at the beginning
          const categoriesArray = [
            {
              id: 'all',
              name: 'All',
              image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
            },
            ...Array.from(categoryMap.values())
          ];

          setCategories(categoriesArray);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Color scheme
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const circleBorder = isDark ? 'border-gray-700' : 'border-gray-200';
  const hoverBorder = isDark ? 'hover:border-white' : 'hover:border-gray-900';
  const selectedBorder = isDark ? 'border-white' : 'border-gray-900';
  const labelColor = isDark ? 'text-white' : 'text-gray-900';
  const unselectedLabelColor = isDark ? 'text-gray-400' : 'text-gray-600';

  if (loading) {
    return (
      <div className={`w-full py-8 ${bgColor} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center justify-center gap-6 py-4">
          <div className="animate-pulse flex gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className={`w-20 h-20 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                <div className={`h-4 w-16 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full py-8 ${bgColor} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center justify-center">
          <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            Error loading categories: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full py-8 ${bgColor} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      {/* Desktop View - Single Row with Scroll */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center gap-6 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            
            return (
              <div
                key={category.id}
                className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group"
                onClick={() => onCategorySelect(category.id)}
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 border-2 overflow-hidden ${
                    isSelected
                      ? `${selectedBorder} scale-110`
                      : `${circleBorder} ${hoverBorder} hover:scale-105`
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isSelected ? labelColor : unselectedLabelColor
                  }`}
                >
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View - Grid Layout */}
      <div className="md:hidden">
        <div className="grid grid-cols-3 gap-4 justify-items-center px-4">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            
            return (
              <div
                key={category.id}
                className="flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => onCategorySelect(category.id)}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 overflow-hidden ${
                    isSelected
                      ? `${selectedBorder} scale-110`
                      : `${circleBorder} ${hoverBorder}`
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`text-xs font-medium text-center transition-colors duration-300 ${
                    isSelected ? labelColor : unselectedLabelColor
                  }`}
                >
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom scrollbar hiding CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}