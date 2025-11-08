import React from 'react'
import MobileBottomBar from '../components/BottomBar'
import Navbar from '../components/TopBar'
import WishlistProducts from '../components/Wishlist'

function WishlistPage() {
  return (
    <div>
        <Navbar/>
        <WishlistProducts/>
    </div>
  )
}

export default WishlistPage