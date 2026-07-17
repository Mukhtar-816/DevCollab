import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/Dashboard";
import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";
import Authentication from "../pages/Authentication";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProjectList from "../pages/ProjectList";
import ProjectDetails from "../pages/ProjectDetails";
import Notifications from "../pages/Notifications";
import SettingsPage from "../pages/Settings";
import PricingPage from "../pages/Pricing";
import NotFound from "../pages/NotFound";
import Otp from "../pages/Otp";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import Invitation from "../pages/Invitation";

const MainNavigation = () => {
  const { isAuthChecked } = useSelector((state: any) => state.auth);

  if (!isAuthChecked) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
        <Route path="/auth" element={<PublicRoute><Authentication /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
        <Route path="/register/verify" element={<PublicRoute><Otp /></PublicRoute>} />

        {/* Protected Dashboard/App Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/invitations" element={<ProtectedRoute><Invitation/></ProtectedRoute>}/>

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainNavigation;