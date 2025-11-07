'use client';

import { Search, Heart, ShoppingBag, User, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../providers/ThemeProviders';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(null);

  const iconClass = "w-6 h-6 cursor-pointer transition-colors duration-200";
  const hoverClass = isDark ? "hover:text-gray-400" : "hover:text-gray-600";
  const textColor = isDark ? "text-white" : "text-black";
  const bgColor = isDark ? "bg-neutral-950 border-neutral-800" : "bg-white border-gray-200";

  return (
    <nav className={`w-full border-b sticky top-0 z-50 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Desktop View */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Logo */}
            <div className={`text-2xl font-bold ${textColor}`}>LOGO</div>

            {/* Icons Container */}
            <div className="flex items-center gap-8">
              <div
                className={`${iconClass} ${hoverClass} ${textColor}`}
                onMouseEnter={() => setIsHovered('search')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Search />
              </div>
              <div
                className={`${iconClass} ${hoverClass} ${textColor}`}
                onMouseEnter={() => setIsHovered('heart')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Heart />
              </div>
              <div
                className={`${iconClass} ${hoverClass} ${textColor}`}
                onMouseEnter={() => setIsHovered('bag')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <ShoppingBag />
              </div>
              <div
                className={`${iconClass} ${hoverClass} ${textColor}`}
                onMouseEnter={() => setIsHovered('profile')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <User />
              </div>

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
            <div className={`text-2xl font-bold ${textColor}`}>LOGO</div>
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