'use client';

import { useTheme } from '../providers/ThemeProviders';

export default function CategoryCircles({ selectedCategory, onCategorySelect, categories }) {
  const { isDark } = useTheme();

  // Default categories if none provided
  const defaultCategories = [
    { id: 0, name: 'All', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400' },
    { id: 1, name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400' },
    { id: 2, name: 'Footwear', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400' },
    { id: 3, name: 'Outerwear', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
    { id: 4, name: 'Accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400' },
    { id: 5, name: 'Sportswear', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400' },
  ];

  const displayCategories = categories || defaultCategories;

  // Updated color scheme
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const circleBorder = isDark ? 'border-gray-700' : 'border-gray-200';
  const hoverBorder = isDark ? 'hover:border-white' : 'hover:border-gray-900';
  const selectedBorder = isDark ? 'border-white' : 'border-gray-900';
  const labelColor = isDark ? 'text-white' : 'text-gray-900';
  const unselectedLabelColor = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`w-full py-8 ${bgColor} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      {/* Desktop View - Single Row with Scroll */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center gap-6 overflow-x-auto py-4 scrollbar-hide">
          {displayCategories.map((category) => {
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
          {displayCategories.map((category) => {
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