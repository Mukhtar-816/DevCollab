import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import CustomLoader from '../components/layout/CustomLoader';
import Navbar from '../components/layout/Navbar';
import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';
import { useTheme } from '../context/ThemeContext';

// Pages
import HomePage from '../pages/Home/Home';
import DashboardPage from '../pages/Dashboard/Dashboard';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';
import ProfilePage from '../pages/Profile/Profile';
import Otp from '../pages/Otp/Otp.screen';

import { useApp } from '../context/AppContext';

const AppRouter = () => {
    const { loading } = useApp();
    const { isDarkMode } = useTheme();

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
                {/* Only show loader when app state is loading */}
                {loading && <CustomLoader />}

                <ToastContainer 
                    theme={isDarkMode ? "dark" : "light"} 
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Navbar />

                <main className="relative">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                        <Route path='/verify' element={<PublicRoute><Otp /></PublicRoute>} />

                        {/* Private Routes */}
                        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

                        {/* 404 Catch-all (Optional but recommended) */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;