// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { userData, loading } = useContext(AppContext); // <-- Make sure `loading` is available from context

  // Show a loader while context is initializing
  if (loading) {
    return <div>Loading...</div>; // Or your custom spinner
  }

  // If user not logged in
  if (!userData || !userData.token) {
    return <Navigate to="/login" replace />;
  }

  // If user role doesn't match
  if (requiredRole && userData.user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
