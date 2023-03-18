import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../reduxToolkit/actions/userAction";
import { reload } from "../reduxToolkit/reducer/user/userSlice";



const ProtectRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // console.log(isAuthenticated);
  const dispatch = useDispatch();
  if (isAuthenticated === false) {
    return <Navigate replace to="/login" />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate replace to="/login" />;
  }
  if(document.cookie) {
    dispatch();
  }
  return children;
};

export default ProtectRoute;
