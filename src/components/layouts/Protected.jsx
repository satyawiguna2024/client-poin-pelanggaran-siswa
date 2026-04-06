import { Navigate, Outlet } from "react-router";

export function ProtectedRouteDashboard() {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export function ProtectedRouteForm() {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}