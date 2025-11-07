'use client';

import { useState } from 'react';
import { useTheme } from '../providers/ThemeProviders';

export default function CategoryCircles({ categories }) {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Default categories if none provided
  const defaultCategories = [
    { id: 0, name: 'Phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
    { id: 1, name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400' },
    { id: 2, name: 'Watches', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400' },
    { id: 3, name: 'Footwear', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400' },
    { id: 4, name: 'Eyewear', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400' },
    { id: 5, name: 'Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' },
    { id: 6, name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400' },
    { id: 7, name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
    { id: 8, name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
    { id: 9, name: 'Home', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400' },
    { id: 10, name: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400' },
    { id: 11, name: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400' },
  ];

  const displayCategories = categories || defaultCategories;

  // Updated color scheme
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const circleBorder = isDark ? 'border-gray-700' : 'border-gray-300';
  const hoverBorder = isDark ? 'hover:border-white' : 'hover:border-gray-500';
  const selectedBorder = isDark ? 'border-white' : 'border-black';
  const labelColor = isDark ? 'text-white' : 'text-black';
  const unselectedLabelColor = isDark ? 'text-gray-400' : 'text-gray-600';

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className={`w-full py-8 ${bgColor}`}>
      {/* Desktop View - Single Row with Scroll */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center gap-6 overflow-x-auto py-4 scrollbar-hide">
          {displayCategories.map((category) => {
            const isSelected = selectedCategory === category.id;
            
            return (
              <div
                key={category.id}
                className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group"
                onClick={() => handleCategoryClick(category.id)}
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
        <div className="grid grid-cols-4 gap-4 justify-items-center">
          {displayCategories.map((category) => {
            const isSelected = selectedCategory === category.id;
            
            return (
              <div
                key={category.id}
                className="flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
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