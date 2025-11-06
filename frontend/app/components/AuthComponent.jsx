"use client"
import React, { useState } from 'react';

export default function AuthComponent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    if (isLogin) {
      console.log('Login:', { email, password });
    } else {
      console.log('Sign Up:', { firstName, lastName, email, password });
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  // Electronics product images
  const products = [
    { id: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', name: 'Headphones' },
    { id: 2, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', name: 'Watch' },
    { id: 3, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', name: 'Sunglasses' },
    { id: 4, image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop', name: 'Sneakers' },
    { id: 5, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop', name: 'Camera' },
    { id: 6, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop', name: 'Smart Watch' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex">
      {/* Left Side - Product Display */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl"></div>
        
        {/* Logo and Text */}
        <div className="relative z-10 text-center mb-12">
          <div className="flex items-center justify-center mb-6">
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">EMI-based Shopping</h1>
          <p className="text-xl text-white opacity-90 max-w-md">
            Shop now, pay later with flexible EMI options. Get your favorite electronics without burning a hole in your pocket!
          </p>
        </div>

        {/* Product Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-6 max-w-2xl">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-10"
              style={{
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="bg-white rounded-2xl p-4 shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600 to-transparent opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold text-gray-900">EMI-based Shopping</h1>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-lg shadow-sm p-8 min-h-[400px]">
            {/* Toggle Tabs */}
            <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                  isLogin
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                  !isLogin
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {isLogin
                  ? "Login to access your account and continue shopping"
                  : "Sign up now. It's FREE! Takes less than a minute."}
              </p>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              {/* First Name - Sign Up Only */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  !isLogin ? 'max-h-20 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0 overflow-hidden'
                }`}
              >
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
                  tabIndex={!isLogin ? 0 : -1}
                />
              </div>

              {/* Last Name - Sign Up Only */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  !isLogin ? 'max-h-20 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0 overflow-hidden'
                }`}
              >
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
                  tabIndex={!isLogin ? 0 : -1}
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
                />
              </div>

              {/* Password Input */}
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
                />
              </div>

              {/* Auth Button */}
              <button
                onClick={handleAuth}
                className="w-full cursor-pointer bg-gray-900 text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}