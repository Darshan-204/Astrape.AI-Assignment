import { Navigate } from "react-router-dom";
import React from "react";

function isAuthenticated() {
  // Example: check for token in localStorage
  return Boolean(localStorage.getItem("token"));
}

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};
