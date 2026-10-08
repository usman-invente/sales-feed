// src/components/PublicOnlyRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PublicOnlyRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If user is already logged in, redirect them to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};