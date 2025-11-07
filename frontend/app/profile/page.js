"use client"
import React from 'react'
import Navbar from '../components/TopBar'
import Profile from '../components/ProfileSection'
import MobileBottomBar from '../components/BottomBar'

function page() {
  return (
    <div>
        <Navbar/>
        <Profile/>
        <MobileBottomBar/>
    </div>
  )
}

export default page