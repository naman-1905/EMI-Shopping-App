'use client';

import { Home, Heart, ShoppingBag, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../providers/ThemeProviders';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomBar() {
  const { isDark } = useTheme();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show bar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const bgColor = isDark ? "bg-neutral-950 border-white" : "bg-white border-blue-500";
  const textColor = isDark ? "text-gray-400" : "text-gray-500";
  const activeColor = isDark ? "text-white" : "text-black";

  const tabs = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { id: 'cart', icon: ShoppingBag, label: 'Cart', path: '/cart' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div 
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className={`${bgColor} border-t-2 rounded-t-3xl shadow-lg`}>
        <div className="flex items-center justify-around px-6 py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.path;

            return (
              <Link
                key={tab.id}
                href={tab.path}
                className="flex flex-col items-center gap-1 transition-all duration-200"
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? isDark
                        ? 'bg-neutral-800'
                        : 'bg-gray-100'
                      : ''
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isActive ? activeColor : textColor
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-medium transition-colors duration-200 ${
                    isActive ? activeColor : textColor
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}