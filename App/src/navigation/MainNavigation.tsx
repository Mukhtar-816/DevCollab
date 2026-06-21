import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/Dashboard";
import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";
import Authentication from "../pages/Authentication";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Otp from "../pages/Otp";

const MainNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <Authentication />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />

        <Route
        path="/register/verify"
        element={
          <PublicRoute>
            <Otp/>
          </PublicRoute>
        }/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainNavigation;