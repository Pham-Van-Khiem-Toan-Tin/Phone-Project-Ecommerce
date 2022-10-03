import React, { useRef, useState } from "react";
import { FaEyeSlash, FaEye, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./LoginAndSignUp.css";
const LoginAndSignUp = () => {
  const [type, setType] = useState("password");
  const [iconEyeSlash, setIconEyeSlash] = useState(true);
  const forms = useRef(null);
 
  const handleShowForm = (e) => {
    e.preventDefault();
    forms.current.classList.toggle("show-signup"); 
  }
  return (
    <div className="user forms" ref={forms}>
      <div className="form login">
        <div className="form-content">
          <div className="form-header">Login</div>
          <form action="#">
            <div className="field input-field">
              <input type="email" placeholder="Email" className="input" required />
            </div>
            <div className="field input-field">
              <input type={type} placeholder="Password" className="input" required/>
              {iconEyeSlash ? (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={() => {setIconEyeSlash(false); setType("text")}}
                />
              ) : (
                <FaEye
                  className="eye-icon"
                  onClick={() => {setIconEyeSlash(true); setType("password")}}
                />
              )}
            </div>
            <div className="form-link">
              <a href="#" className="forgot-pass">
                Forgot password?
              </a>
            </div>
            <div className="field input-field">
              <button>Login</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Already have an account?
              <a href="#" className="signup-link" onClick={(e) => {
                handleShowForm(e)
              }}>
                Sign up
              </a>
            </span>
          </div>
        </div>
        <div className="line"></div>
        <div className="media-options">
          <a href="" className="field facebook">
            <FaFacebookF className="facebook-icon" />
            <span>Login with Facebook</span>
          </a>
        </div>
        <div className="media-options">
          <a href="" className="field google">
            <FcGoogle className="google-icon" />
            <span>Login with Google</span>
          </a>
        </div>
      </div>
{/* form sign-up */}
      <div className="form sign-up">
        <div className="form-content">
          <div className="form-header">Sign Up</div>
          <form action="#">
            <div className="field input-field">
              <input type="email" placeholder="Email" className="input" required/>
            </div>
            <div className="field input-field">
              <input type={type} placeholder="Password" className="input" required/>
            </div>
            <div className="field input-field">
              <input type={type} placeholder="Password" className="input" required />
              {iconEyeSlash ? (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={() => {setIconEyeSlash(false); setType("text")}}
                />
              ) : (
                <FaEye
                  className="eye-icon"
                  onClick={() => {setIconEyeSlash(true); setType("password")}}
                />
              )}
            </div>

            <div className="field input-field">
              <button>Sign Up</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Already have an account?
              <a href="#" className="login-link" onClick={(e) => {
                handleShowForm(e);
              }}>
                Login
              </a>
            </span>
          </div>
        </div>
        <div className="line"></div>
        <div className="media-options">
          <a href="" className="field facebook">
            <FaFacebookF className="facebook-icon" />
            <span>Login with Facebook</span>
          </a>
        </div>
        <div className="media-options">
          <a href="" className="field google">
            <FcGoogle className="google-icon" />
            <span>Login with Google</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignUp;
