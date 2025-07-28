// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { userData } = useContext(AppContext);
  console.log(!userData?.token);
  if (!userData || !userData.token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userData?.user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
