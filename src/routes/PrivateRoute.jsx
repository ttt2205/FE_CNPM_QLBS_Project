import { useAuth } from "../context/AuthContext";
import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import ErrorPage from "../components/admin/error-page";
import LogoutButton from "../components/LogoutButton";

export const PrivateRoute = ({ children }) => {
  const { token, user } = useAuth();
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  if (!user || user.role != "admin") {
    return (
      <ErrorPage
        otherError={{ message: "You are not admin!" }}
        children={<LogoutButton />}
      />
    );
  }
  return <Outlet />;
};

export default PrivateRoute;
