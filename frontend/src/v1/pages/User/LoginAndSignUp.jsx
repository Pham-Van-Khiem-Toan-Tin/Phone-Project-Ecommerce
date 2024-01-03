import React, { useEffect, useRef, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { register, login } from "../../reduxToolkit/actions/userAction";
import {
  clearError,
  resetSuccess,
} from "../../reduxToolkit/reducer/user/userSlice";
import { toast } from "react-toastify";
import "./login-signup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputPass from "../../components/InputPass/InputPass";
const LoginAndSignUp = ({HeaderComponent, FooterComponent}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const forms = useRef(null);

  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated, successAu, message } = useSelector(
    (state) => state.user
  );

  const handleShowForm = (e) => {
    e.preventDefault();
    forms.current.classList.toggle("show-signup");
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/assets/images/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState(
    "/assets/images/Profile.png"
  );
  const handleInputLoginCHange = (e) => {
    setloginPassword(e.target.value);
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ loginEmail, loginPassword }));
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (successAu) {
      toast.success(message);
      dispatch(resetSuccess());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect, successAu]);

  return (
    <>
    <HeaderComponent />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="login-signup forms" ref={forms}>
          <div className="form rounded login">
            <div className="form-content">
              <p className="form-header text-center">Login</p>
              <form onSubmit={loginSubmit}>
                <div className="field input-field">
                  <label htmlFor="login-email">Email: <span className="text-danger">*</span></label>
                  <input
                    type="email"
                    id="login-email"
                    placeholder="Email"
                    className="form-control"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="field input-field">
                  <InputPass
                  title="Password"
                  id="login-password"
                    value={loginPassword}
                    onChange={handleInputLoginCHange}
                    placeholder="Password"
                  />
                </div>
                <div className="form-link">
                  <Link to="/password/forgot" className="forgot-pass">
                    Forgot password?
                  </Link>
                </div>
                <div className="field input-field">
                  <button type="submit" className="btn btn-primary btn-sm w-100">Login</button>
                </div>
              </form>
              <div className="form-link">
                <span>
                  Already have an account? <span
                    className="signup-link"
                    onClick={(e) => {
                      handleShowForm(e);
                    }}
                  >
                    Sign up
                  </span>
                </span>
              </div>
            </div>          
          </div>
          {/* form sign-up */}
          <div className="form rounded sign-up">
            <div className="form-content">
              <p className="form-header">Sign Up</p>
              <form encType="multipart/form-data" onSubmit={registerSubmit}>
                <div className="field input-field">
                  <label htmlFor="name">
                    Name: <span className="text-danger">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    name="name"
                    value={name}
                    required
                    onChange={registerDataChange}
                  />
                </div>
                <div className="field input-field">
                  <label htmlFor="signup-email">
                    Email: <span className="text-danger">*</span>
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    value={email}
                    required
                    onChange={registerDataChange}
                  />
                </div>
                <div className="field input-field">
                  <InputPass
                    title="Password"
                    id="signup-password"
                    value={password}
                    name="password"
                    onChange={registerDataChange}
                    placeholder="Password"
                  />
                </div>
                <div className="avatar d-flex align-items-center justify-content-between">
                  <img src={avatarPreview} className="rounded-circle" alt="" />
                  <label
                    className="btn btn-primary btn-sm w-75"
                    htmlFor="avatar-file"
                  >
                    Choose Your Avatar
                  </label>
                  <input
                    type="file"
                    id="avatar-file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <div className="field input-field">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm w-100"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="form-link">
                <span>
                  Already have an account?{" "}
                  <span
                    className="login-link"
                    onClick={(e) => {
                      handleShowForm(e);
                    }}
                  >
                    Login
                  </span>
                </span>
              </div>
            </div>
            <div className="line"></div>
          </div>
        </div>
      )}
      <FooterComponent />
    </>
  );
};

export default LoginAndSignUp;
