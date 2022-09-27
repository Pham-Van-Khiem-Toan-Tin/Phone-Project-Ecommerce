import React, { useState } from "react";
import "./User.css";
const User = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="user">
       <div className="LoginSignUpBox">
        <div className="login_signup_toggle">
          <p>Login</p>
          <p>Register</p>
        </div>
       </div>
    </div>
  );
};

export default User;
