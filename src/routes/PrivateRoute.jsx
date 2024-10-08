import { useAuth } from "../context/AuthContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="login" />;
  return <Outlet />;
};

export default PrivateRoute;
