// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { user } = useAuth();

    return user ? element : <Navigate to="/" />; // Redirect to homepage if not authenticated
};

export default ProtectedRoute;
