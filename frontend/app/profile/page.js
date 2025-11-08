"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';
import Navbar from '../components/TopBar'
import MobileBottomBar from '../components/BottomBar'
import UserInfo from '../components/UserInfo'
import Orders from '../components/Orders'
import Addresses from '../components/Addresses'
import LoginPromptBox from '../components/LoginModal'

function Page() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Theme colors
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (authToken && refreshToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    
    // Redirect to home page
    router.push('/');
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className={`text-lg ${textColor}`}>Loading...</div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${bgColor}`}>
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
          <LoginPromptBox />
        </div>
        <MobileBottomBar />
      </div>
    );
  }

  // Show profile page if authenticated
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