import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { reload } from "../reduxToolkit/reducer/user/userSlice";

const ProtectRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
<<<<<<< HEAD
  const dispatch = useDispatch();
  if (!localStorage.getItem('accessToken') && isAuthenticated === false) {
=======
  if (isAuthenticated === false) {
>>>>>>> c17094c894dc9b4745fe69861ed2f6cd1bfe3025
    return <Navigate replace to="/login" />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate replace to="/login" />;
  }
  return children;
};

export default ProtectRoute;
