import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { reload } from "../reduxToolkit/reducer/user/userSlice";
import { getAccount } from "../reduxToolkit/actions/userAction";

const ProtectRoute = ({ isAdmin, children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  if (!localStorage.getItem('accessToken')) {
    return <Navigate replace to="/login" />;
  }
  if (isAdmin === true && localStorage.getItem("role") !== "admin") {
    return <Navigate replace to="/login" />;
  }
  return children;
};

export default ProtectRoute;
