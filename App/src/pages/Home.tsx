// HomePage.tsx
import React from 'react'
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'

const HomePage = () => {
  return (
    <div className='flex bg-red-900 h-[100vh] w-full flex-col'>
      <NavBar />
      <HeroSection />
    </div>
  )
}

export default HomePage