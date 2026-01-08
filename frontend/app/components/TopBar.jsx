'use client';

import { Search, Heart, ShoppingBag, User, Moon, Sun, X, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../providers/ThemeProviders';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const timeoutRef = useRef(null);

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

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
      setSearchResults([]);
      setShowResults(false);
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL}/api/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce search
    timeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Clear timeout and search immediately
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      performSearch(searchQuery);
    }
  };

  const handleProductClick = (skuId) => {
    router.push(`/product/${skuId}`);
    setShowResults(false);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <nav className={`w-full border-b sticky top-0 z-50 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Desktop View */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" className={`flex items-center ${textColor} hover:opacity-80 transition-opacity`}>
              LOGO
            </Link>

            {/* Center Search Bar - Expanded */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-96 opacity-100' : 'w-0 opacity-0'}`}>
              {isSearchOpen && (
                <div className="relative" ref={searchResultsRef}>
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"} z-10`} />
                    {isLoading && (
                      <Loader2 className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"} animate-spin z-10`} />
                    )}
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Search products..."
                      className={`w-full pl-10 pr-10 py-2 rounded-lg ${isDark ? "bg-neutral-900 border-neutral-700" : "bg-gray-100 border-gray-300"} ${textColor} border focus:outline-none focus:ring-2 ${isDark ? "focus:ring-neutral-700" : "focus:ring-gray-300"} placeholder-gray-500`}
                    />
                  </div>

                  {/* Search Results Dropdown */}
                  {showResults && (
                    <div className={`absolute top-full mt-2 w-full rounded-lg shadow-lg overflow-hidden ${isDark ? "bg-neutral-900 border-neutral-700" : "bg-white border-gray-200"} border max-h-96 overflow-y-auto`}>
                      {searchResults.length > 0 ? (
                        <>
                          {searchResults.map((product) => (
                            <div
                              key={product.sku_id}
                              onClick={() => handleProductClick(product.sku_id)}
                              className={`p-4 cursor-pointer transition-colors ${isDark ? "hover:bg-neutral-800" : "hover:bg-gray-50"} border-b ${isDark ? "border-neutral-800" : "border-gray-100"} last:border-b-0`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-16 h-16 rounded-md flex items-center justify-center ${isDark ? "bg-neutral-800" : "bg-gray-100"}`}>
                                  <ShoppingBag className={`w-8 h-8 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <h3 className={`font-semibold ${textColor} text-sm`}>
                                      {product.sku_name}
                                    </h3>
                                    {product.special_tag && (
                                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                                        Special
                                      </span>
                                    )}
                                  </div>
                                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"} mt-1`}>
                                    {product.sku_brand} • {product.category}
                                  </p>
                                  <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"} mt-1 line-clamp-2`}>
                                    {product.sku_description}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <p className={`font-bold ${textColor}`}>
                                      {formatPrice(product.price)}
                                    </p>
                                    {product.best_selling && (
                                      <span className={`text-xs ${isDark ? "text-green-400" : "text-green-600"}`}>
                                        ⭐ Best Seller
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="p-8 text-center">
                          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            No products found for "{searchQuery}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
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
            <Link href="/" className={`flex items-center ${textColor} hover:opacity-80 transition-opacity`}>
              <Image 
                src="/1fi_logo.jpg" 
                alt="1Fi Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
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
