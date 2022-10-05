import { useState } from "react";
import LoginAndSignUp from "./LoginAndSignUp";
import Profile from "./Profile";
import "./User.css";
const User = () => {
  const [isLogined, setIsLogined] = useState(false);
  return (
    <>
      {isLogined?(<Profile />):(<LoginAndSignUp/>)}
    </>
  );
};

export default User;
