"use client"
import React from 'react'
import { LogOut } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';
import Navbar from '../components/TopBar'
import MobileBottomBar from '../components/BottomBar'
import UserInfo from '../components/UserInfo'
import Orders from '../components/Orders'
import Addresses from '../components/Addresses'

function Page() {
  const { isDark } = useTheme();

  // Theme colors
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
  };

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        {/* Title */}
        <h1 className={`text-3xl md:text-4xl font-bold ${textColor} mb-8`}>
          Profile
        </h1>

        {/* User Info Section */}
        <div className="mb-6">
          <UserInfo />
        </div>

        {/* Orders Section */}
        <div className="mb-6">
          <Orders />
        </div>

        {/* Addresses Section */}
        <div className="mb-6">
          <Addresses />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors mb-20"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <MobileBottomBar />
    </div>
  );
}

export default Page