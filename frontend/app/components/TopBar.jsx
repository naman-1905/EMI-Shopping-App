'use client';

import { Search, Heart, ShoppingBag, User, Moon, Sun, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../providers/ThemeProviders';
import Link from 'next/link';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const iconClass = "w-6 h-6 cursor-pointer transition-colors duration-200";
  const hoverClass = isDark ? "hover:text-gray-400" : "hover:text-gray-600";
  const textColor = isDark ? "text-white" : "text-black";
  const bgColor = isDark ? "bg-neutral-950 border-neutral-800" : "bg-white border-gray-200";

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

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
    <nav className={`w-full border-b sticky top-0 z-50 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Desktop View */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" className={`text-2xl font-bold ${textColor} hover:opacity-80 transition-opacity`}>
              1Fi
            </Link>

            {/* Center Search Bar - Expanded */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-96 opacity-100' : 'w-0 opacity-0'}`}>
              {isSearchOpen && (
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search products..."
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${isDark ? "bg-neutral-900 border-neutral-700" : "bg-gray-100 border-gray-300"} ${textColor} border focus:outline-none focus:ring-2 ${isDark ? "focus:ring-neutral-700" : "focus:ring-gray-300"} placeholder-gray-500`}
                  />
                </div>
              )}
            </div>

            {/* Icons Container */}
            <div className="flex items-center gap-8">
              <div
                className={`${iconClass} ${hoverClass} ${textColor}`}
                onClick={toggleSearch}
                onMouseEnter={() => setIsHovered('search')}
                onMouseLeave={() => setIsHovered(null)}
              >
                {isSearchOpen ? <X /> : <Search />}
              </div>
              <Link
                href="/wishlist"
                className={`${iconClass} ${hoverClass} ${textColor}`}
                onMouseEnter={() => setIsHovered('heart')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Heart />
              </Link>
              <Link
                href="/cart"
                className={`${iconClass} ${hoverClass} ${textColor}`}
                onMouseEnter={() => setIsHovered('bag')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <ShoppingBag />
              </Link>
              <Link
                href="/profile"
                className={`${iconClass} ${hoverClass} ${textColor}`}
                onMouseEnter={() => setIsHovered('profile')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <User />
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`${iconClass} ${hoverClass} ${textColor}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun /> : <Moon />}
              </button>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/home" className={`text-2xl font-bold ${textColor} hover:opacity-80 transition-opacity`}>
              1Fi
            </Link>
            <button
              onClick={toggleTheme}
              className={`${iconClass} ${hoverClass} ${textColor}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}