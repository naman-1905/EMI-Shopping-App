"use client"
import React from 'react'
import Navbar from '../components/TopBar'
import MobileBottomBar from '../components/BottomBar'
import Cart from '../components/Cart'

function CartPage() {
  return (
    <div>
        <Navbar/>
        <Cart/>
        <MobileBottomBar/>
    </div>
  )
}

export default CartPage