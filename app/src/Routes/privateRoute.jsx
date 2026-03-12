import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useApp();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login, but save the current location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;