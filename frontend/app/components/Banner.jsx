'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

export default function ImageSlider({ images }) {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  // Default images if none provided
  const defaultImages = [
    { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200', alt: 'Product 1' },
    { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200', alt: 'Product 2' },
    { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200', alt: 'Product 3' },
    { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200', alt: 'Product 4' },
  ];

  const slideImages = images || defaultImages;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      prevSlide();
    }
  };

  const bgColor = isDark ? 'bg-neutral-900' : 'bg-gray-100';
  const buttonBg = isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-white hover:bg-gray-50';
  const dotBg = isDark ? 'bg-neutral-700' : 'bg-gray-300';
  const activeDotBg = isDark ? 'bg-white' : 'bg-black';
  const textColor = isDark ? 'text-white' : 'text-black';

  return (
    <div 
      ref={sliderRef}
      className={`relative w-full h-[300px] md:h-[500px] ${bgColor} overflow-hidden group`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images Container */}
      <div className="relative w-full h-full">
        {slideImages.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Desktop Only */}
      <button
        onClick={prevSlide}
        className={`hidden md:block absolute left-4 top-1/2 -translate-y-1/2 ${buttonBg} ${textColor} p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className={`hidden md:block absolute right-4 top-1/2 -translate-y-1/2 ${buttonBg} ${textColor} p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slideImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? `${activeDotBg} w-8` : dotBg
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile Swipe Indicator - Shows briefly on mobile */}
      <div className="md:hidden absolute inset-0 pointer-events-none flex items-center justify-between px-8 opacity-20">
        <ChevronLeft className={`w-8 h-8 ${textColor}`} />
        <ChevronRight className={`w-8 h-8 ${textColor}`} />
      </div>
    </div>
  );
}