// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, hasRole } = useAuth();

  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" replace />;
  //   }

  //   if (!hasRole("admin")) {
  //     alert("Acceso Denegado: Permisos insuficientes.");
  //     return <Navigate to="/home" replace />;
  //   }

  return children;
};

export default AdminRoute;
