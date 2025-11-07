'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../providers/ThemeProviders';

export default function MobileSearchBar() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const textColor = isDark ? "text-white" : "text-black";
  const bgColor = isDark ? "bg-neutral-900" : "bg-gray-100";
  const borderColor = isDark ? "border-neutral-800" : "border-gray-200";
  const navBgColor = isDark ? "bg-neutral-950" : "bg-white";

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`md:hidden w-full px-4 py-3 ${navBgColor} border-b ${borderColor} sticky top-16 z-40`}>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search products..."
          className={`w-full pl-10 pr-4 py-2 rounded-lg ${bgColor} ${textColor} ${borderColor} border focus:outline-none focus:ring-2 ${isDark ? "focus:ring-neutral-700 placeholder-gray-400" : "focus:ring-gray-300 placeholder-gray-400"}`}
        />
      </div>
    </div>
  );
}