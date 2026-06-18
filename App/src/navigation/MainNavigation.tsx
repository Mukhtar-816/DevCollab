import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/dashboard.js';
import HomePage from '../pages/home.js';
import ProfilePage from '../pages/profile.js';
import Authentication from '../pages/Authentication.js';

const MainNavigation = () => {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path='/auth' element={<Authentication />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default MainNavigation
