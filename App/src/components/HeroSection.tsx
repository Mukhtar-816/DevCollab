// HeroSection.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className='flex w-full h-[90vh] justify-center items-center px-5'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='flex flex-col items-center text-center max-w-2xl gap-6'
      >
        <span className='text-white/60 text-xs font-medium tracking-widest uppercase border border-white/15 rounded-full px-4 py-1'>
          Built for developers
        </span>

        <h1 className='text-white text-3xl md:text-5xl font-bold leading-tight'>
          Find the right developers to build with
        </h1>

        <p className='text-white/60 text-sm md:text-base max-w-md'>
          Collaborate on real projects, grow your portfolio, and connect with engineers who push you forward.
        </p>

        <div className='flex gap-3 mt-2'>
          <button
            onClick={() => navigate("auth")}
            className='bg-white text-red-900 font-semibold text-sm px-6 py-2.5 rounded-md hover:bg-white/90 hover:scale-105 transition-all shadow-lg'
          >
            Get Started
          </button>
          <button className='border border-white/20 text-white/90 font-medium text-sm px-6 py-2.5 rounded-md hover:bg-white/5 transition-all'>
            Learn More
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default HeroSection