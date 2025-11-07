"use client"
import MobileBottomBar from '@/app/components/BottomBar'
import ProductInfo from '@/app/components/ProductInfo'
import Navbar from '@/app/components/TopBar'
import Variants from '@/app/components/Variants'
import ActionButtons from '@/app/components/ActionButtons'
import { useTheme } from '@/app/providers/ThemeProviders'
import React from 'react'

function ProductPage() {
  const { isDark } = useTheme();

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    // Add your checkout logic here
  };

  const handleAddToCart = () => {
    console.log('Adding to cart');
    // Add your cart logic here
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
      <Navbar />

      {/* Side-by-side layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <Variants />

        {/* Right Side */}
        <div className="flex flex-col">
          <ProductInfo />
          <ActionButtons 
            onCheckout={handleCheckout}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductPage