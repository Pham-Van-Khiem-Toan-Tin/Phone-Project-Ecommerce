import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { reload } from "../reduxToolkit/reducer/user/userSlice";

const ProtectRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (document.cookie.accessToken) {
  //     dispatch(reload);
  //   } else {
  //     return <Navigate replace to="/login" />;
  //   }
  // }, [dispatch]);

  // console.log(isAuthenticated);
  if (isAuthenticated === false) {
    return <Navigate replace to="/login" />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate replace to="/login" />;
  }
  
  return children;
};

export default ProtectRoute;
