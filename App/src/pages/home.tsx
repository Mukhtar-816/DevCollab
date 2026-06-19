import React from 'react'
import NavBar from '../components/NavBar'
import { motion } from "framer-motion"
import HeroSection from '../components/HeroSection'

const HomePage = () => {
  return (
    <div className='flex bg-red-900 h-[100vh] w-full flex-col'>
        <NavBar/>

      <div className='flex'>
        <HeroSection/>

      </div>

    </div>
  )
}

export default HomePage
