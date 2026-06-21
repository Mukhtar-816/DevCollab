// NavBar.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice/auth.actions';
import { toast } from 'react-toastify';

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (!isAuthenticated) return;

    try {
      await dispatch(logout()).unwrap();

    } catch (error: any) {
      const message =
        error?.message ||
        error?.error ||
        error?.data?.message ||
        "Verification failed. Please try again.";

      toast.error(message);
    }
  }

  return (
    <motion.div
      className='flex w-full h-[60px]'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className='backdrop-blur-xl bg-transparent flex w-full border-b border-b-white/10 justify-between items-center px-5 md:px-10'>
        <h1 className='text-xl text-white font-bold hover:opacity-100 opacity-90 transition-all'>
          DevCollab
        </h1>

        <div className='gap-3 flex flex-row'>
          <button
            onClick={() => navigate("auth")}
            className='px-5 py-1.5 border border-white/15 hover:bg-white/5 hover:scale-105 transition-all font-medium text-sm rounded-md text-white/90'
          >
            Login
          </button>
          <button
            onClick={() => navigate("auth")}
            className='px-5 py-1.5 bg-white text-red-900 hover:bg-white/90 hover:scale-105 transition-all font-medium text-sm rounded-md shadow-md'
          >
            Signup
          </button>
          <button
            onClick={() => handleLogout()}
            className='p-2 bg-white text-red-900 hover:bg-white/90 hover:scale-105 transition-all font-medium text-sm rounded-md shadow-md'
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default NavBar