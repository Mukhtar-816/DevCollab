import React from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
    return (
        <div className='flex flex-row w-full h-[90vh] justify-center items-center'>
           <div className='w-1/2 flex'> 
             <div className='max-h-1/2 bg-red-950/70 rounded-md shadow-6xl p-10 pb-20'>
                <h1 className='text-white/90 font-semibold text-3xl'> Are you Looking to collaborate with right developers to start ?</h1>
            </div>
           </div>


        </div>
    )
}

export default HeroSection
