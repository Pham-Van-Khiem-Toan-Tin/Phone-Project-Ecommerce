import React from "react";
import {  useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  if (isAuthenticated === false && !localStorage.getItem("accessToken")) {
    return <Navigate replace to="/login" />;
  }
  if (isAdmin === true && user?.role !== "admin" && !localStorage.getItem("accessToken")) {
    return <Navigate replace to="/login" />;
  }
  return children;
};

export default ProtectRoute;
