'use client';

import { Home, Heart, ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../providers/ThemeProviders';

export default function MobileBottomBar() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  const bgColor = isDark ? "bg-neutral-950 border-neutral-800" : "bg-white border-gray-200";
  const textColor = isDark ? "text-gray-400" : "text-gray-500";
  const activeColor = isDark ? "text-white" : "text-black";

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'cart', icon: ShoppingBag, label: 'Cart' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className={`${bgColor} border-t rounded-t-3xl shadow-lg`}>
        <div className="flex items-center justify-around px-6 py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
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
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}