"use client"
import { useState } from 'react';
import ImageSlider from "./components/Banner";
import BestSellingProducts from "./components/BestSelling";
import MobileBottomBar from "./components/BottomBar";
import CategoryCircles from "./components/CategoryCircles";
import MobileSearchBar from "./components/MobileSearchBar";
import Navbar from "./components/TopBar";

export default function Home() {
  // State to manage selected category
  const [selectedCategory, setSelectedCategory] = useState(0); // 0 = All

  // Handler for category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <Navbar />
      <MobileSearchBar />
      <ImageSlider />
      
      {/* Category Selection - passes state and handler */}
      <CategoryCircles 
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      {/* Product Display - receives selected category */}
      <BestSellingProducts 
        selectedCategory={selectedCategory}
      />
      
      <MobileBottomBar />
    </div>
  );
}