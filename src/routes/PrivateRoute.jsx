import { useAuth } from "../context/AuthContext";
import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import ErrorPage from "../components/admin/error-page";
import LogoutButton from "../components/LogoutButton";

export const PrivateRoute = ({ children }) => {
  const { token, user } = useAuth();
  // if (!token) {
  //   // user is not authenticated
  //   // return <Navigate to="/login" />;
  //   return <Outlet />; //test
  // }
  if (user && user.role.role_name === "Admin") {
    return <Outlet />;
  }
  return (
    <ErrorPage
      otherError={{ message: "You are not admin!" }}
      children={<LogoutButton />}
    />
  );
};

export default PrivateRoute;
