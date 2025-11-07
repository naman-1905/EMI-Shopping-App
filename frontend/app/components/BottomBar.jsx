'use client';

import { Home, Heart, ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../providers/ThemeProviders';
import Link from 'next/link';

export default function MobileBottomBar() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  const bgColor = isDark ? "bg-neutral-950 border-white" : "bg-white border-blue-500";
  const textColor = isDark ? "text-gray-400" : "text-gray-500";
  const activeColor = isDark ? "text-white" : "text-black";

  const tabs = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { id: 'cart', icon: ShoppingBag, label: 'Cart', path: '/cart' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className={`${bgColor} border-t-2 rounded-t-3xl shadow-lg`}>
        <div className="flex items-center justify-around px-6 py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <Link
                key={tab.id}
                href={tab.path}
                onClick={() => setActiveTab(tab.id)}
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