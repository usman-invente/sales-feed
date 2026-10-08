// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Wait until initial session check (/refresh) completes
  if (loading) return null;

  // 2. If unauthenticated, redirect to /login and save requested location
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Render child routes if authenticated
  return <Outlet />;
};