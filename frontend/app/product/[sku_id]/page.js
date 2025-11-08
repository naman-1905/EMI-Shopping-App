"use client"
import ProductInfo from '@/app/components/ProductInfo'
import Navbar from '@/app/components/TopBar'
import Variants from '@/app/components/Variants'
import ActionButtons from '@/app/components/ActionButtons'
import { useTheme } from '@/app/providers/ThemeProviders'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

function ProductPage() {
  const { isDark } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedEmiMonths, setSelectedEmiMonths] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://1fib.halfskirmish.com/api/sku/info/${params.sku_id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setProductData(result.data);
        } else {
          throw new Error(result.message || 'Failed to load product');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.sku_id) {
      fetchProductData();
    }
  }, [params.sku_id]);

  // Handle EMI selection from ProductInfo component
  const handleEmiChange = (months) => {
    setSelectedEmiMonths(months);
  };

  const addToCart = async () => {
    // Get token from localStorage
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    
    if (!token) {
      alert('Please login to add items to cart');
      router.push('/login');
      return false;
    }

    try {
      setAddingToCart(true);
      
      // Store EMI selection in localStorage before adding to cart
      if (selectedEmiMonths) {
        const emiSelections = JSON.parse(localStorage.getItem('emiSelections') || '{}');
        emiSelections[params.sku_id] = selectedEmiMonths;
        localStorage.setItem('emiSelections', JSON.stringify(emiSelections));
      }
      
      const response = await fetch('https://1fib.halfskirmish.com/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          sku_id: params.sku_id
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add to cart');
      }

      return true;
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert(err.message || 'Failed to add item to cart');
      return false;
    } finally {
      setAddingToCart(false);
    }
  };

  const handleCheckout = async () => {
    const success = await addToCart();
    if (success) {
      console.log('Item added to cart, proceeding to checkout');
      // Redirect to cart/checkout page
      router.push('/cart');
    }
  };

  const handleAddToCart = async () => {
    const success = await addToCart();
    if (success) {
      console.log('Item added to cart successfully');
      alert('Product added to cart!');
      // Optionally, you can update a cart count in your navbar or show a toast notification
    }
  };

  // Prepare product images
  const getProductImages = () => {
    if (!productData?.sku_image_handler) return [];
    
    const images = [];
    const imageHandler = productData.sku_image_handler;
    
    // Add all available product images
    for (let i = 1; i <= 10; i++) {
      const imageKey = `product_image_${i}_url`;
      if (imageHandler[imageKey]) {
        images.push({
          id: i,
          url: imageHandler[imageKey]
        });
      }
    }
    
    return images;
  };

  // Prepare EMI plans
  const getEmiPlans = () => {
    if (!productData?.sku_price_buying_option_info?.[0]) return [];
    
    const buyingOption = productData.sku_price_buying_option_info[0];
    const plans = [];
    
    if (buyingOption.emi) {
      const emiDurations = [3, 6, 9, 12, 18, 24, 36, 48, 60];
      
      emiDurations.forEach((duration, index) => {
        const emiKey = `emi_${duration}_month`;
        if (buyingOption[emiKey]) {
          plans.push({
            id: index + 1,
            duration: `${duration} months`,
            amount: buyingOption[emiKey]
          });
        }
      });
    }
    
    return plans;
  };

// Calculate discounted price if offer exists
const getPrice = () => {
  if (!productData) return { original: 0, current: 0 };
  
  const original = productData.price;
  
  // Always return original price for both
  return {
    original,
    current: original  // Changed: always use original price
  };
};

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
        <Navbar />
        <div className={`flex items-center justify-center h-96 ${isDark ? 'text-white' : 'text-black'}`}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current mx-auto mb-4"></div>
            <p>Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
        <Navbar />
        <div className={`flex items-center justify-center h-96 ${isDark ? 'text-white' : 'text-black'}`}>
          <div className="text-center">
            <p className="text-xl mb-4">Failed to load product</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const prices = getPrice();
  const images = getProductImages();
  const emiPlans = getEmiPlans();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
      <Navbar />

      {/* Side-by-side layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <Variants images={images} />

        {/* Right Side */}
        <div className="flex flex-col">
          <ProductInfo 
            brand={productData.sku_brand}
            title={productData.sku_name}
            originalPrice={prices.original}
            currentPrice={prices.current}
            description={productData.sku_description}
            emiPlans={emiPlans}
            onEmiChange={handleEmiChange}
          />
          <ActionButtons 
            onCheckout={handleCheckout}
            onAddToCart={handleAddToCart}
            disabled={productData.quantity <= 0 || addingToCart}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductPage