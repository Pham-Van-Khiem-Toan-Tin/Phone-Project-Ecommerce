import React, { useRef, useState } from "react";
import { AiTwotoneMail } from "react-icons/ai";
import { FaLock, FaUserAlt } from "react-icons/fa";

import "./User.css";
const User = () => {
  const [isLogin, setIsLogin] = useState(true);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const swichtTab = (e, tab) => {
      if(tab === "login") {
        registerTab.current.classList.add("changeRegisterToNatrual");
        loginTab.current.classList.add("changLoginToNatrual");

        registerTab.current.classList.remove("changeRegisterToLeft");
        loginTab.current.classList.remove("changLoginToLeft");
      }
      if(tab === "register") {
        registerTab.current.classList.add("changeRegisterToLeft");
        loginTab.current.classList.add("changLoginToLeft");

        registerTab.current.classList.remove("changeRegisterToNatrual");
        loginTab.current.classList.remove("changLoginToNatrual");
      }
  }
  return (
    <div className="user">
      <div className="LoginSignUpBox">
        <div className="login_signup_toggle">
          <p onClick={(e) => swichtTab(e, "login")}>Login</p>
          <p onClick={(e) => swichtTab(e, "register")}>Register</p>
        </div>
        <div className="userForm">
          <form className="loginForm" ref={loginTab}>
            <div className="loginEmail">
              <AiTwotoneMail />
              <input type="email" placeholder="Email" required />
            </div>
            <div className="loginPassword">
              <FaLock />
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit">Sign In</button>
          </form>
          <form className="registerForm" ref={registerTab}>
            <div className="registerUserName">
              <FaUserAlt />
              <input type="text" placeholder="User Name" required />
            </div>
            <div className="registerEmail">
              <AiTwotoneMail />
              <input type="email" placeholder="Email" required />
            </div>
            <div className="registerPassword">
              <FaLock />
              <input type="password" placeholder="Password" required />
            </div>
            <div className="registerConfirmPassword">
              <FaLock />
              <input type="password" placeholder="Confirm Password" required />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
