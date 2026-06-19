import React from 'react'
import { motion } from 'framer-motion'

const NavBar = () => {
    return (
        <motion.div className='flex w-full h-[10%]'
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        <div className='backdrop-blur-xl bg-transparent flex w-full  border-b-2 border-b-white/10 justify-between items-center px-5 md:px-10'>
            <div>
                <h1 className='text-xl text-white font-bold hover:opacity-100 opacity-90 transition-all'>DevCollab</h1>
            </div>
            <div className='gap-5 flex flex-row'>
                <button className='px-5 py-1 border-red-950/20 hover:scale-105 transition-all font-semibold text-sm  border rounded-md text-white/90 shadow-lg'>
                    <h1>Login</h1>
                </button>
                <button className='px-5 py-1 border-red-950/20 hover:scale-105 transition-all font-semibold text-sm  border rounded-md text-white/90 shadow-lg'>
                    <h1>Signup</h1>
                </button>
            </div>
        </div>
      </motion.div>
        
    )
}

export default NavBar
