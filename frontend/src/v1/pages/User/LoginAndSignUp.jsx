import React, { useEffect, useRef, useState } from "react";
import { FaEyeSlash, FaEye, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { register, login } from "../../reduxToolkit/actions/userAction";
import { clearError } from "../../reduxToolkit/reducer/userSlice";
import { toast } from "react-toastify";
import "./LoginAndSignUp.css";
import { useLocation, useNavigate } from "react-router-dom";
const LoginAndSignUp = () => {
  const [type, setType] = useState("password");
  const [iconEyeSlash, setIconEyeSlash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const forms = useRef(null);

  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  console.log({ error: error, isLoading: isLoading });

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
  // console.log({location: location, navigate1: navigate});
  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    console.log(error);
    if (error) {
      toast.error(error);
      console.log("render");
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, toast, redirect]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="loginAndSignUp forms" ref={forms}>
          <div className="form login">
            <div className="form-content">
              <div className="form-header">Login</div>
              <form onSubmit={loginSubmit}>
                <div className="field input-field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="field input-field">
                  <input
                    type={type}
                    placeholder="Password"
                    className="input"
                    value={loginPassword}
                    onChange={(e) => setloginPassword(e.target.value)}
                    required
                  />
                  {iconEyeSlash ? (
                    <FaEyeSlash
                      className="eye-icon"
                      onClick={() => {
                        setIconEyeSlash(false);
                        setType("text");
                      }}
                    />
                  ) : (
                    <FaEye
                      className="eye-icon"
                      onClick={() => {
                        setIconEyeSlash(true);
                        setType("password");
                      }}
                    />
                  )}
                </div>
                <div className="form-link">
                  <a href="#" className="forgot-pass">
                    Forgot password?
                  </a>
                </div>
                <div className="field input-field">
                  <button type="submit">Login</button>
                </div>
              </form>
              <div className="form-link">
                <span>
                  Already have an account?
                  <span
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
              <form encType="multipart/form-data" onSubmit={registerSubmit}>
                <div className="field input-field">
                  <input
                    type="text"
                    placeholder="Name"
                    className="input"
                    name="name"
                    value={name}
                    required
                    onChange={registerDataChange}
                  />
                </div>
                <div className="field input-field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    name="email"
                    value={email}
                    required
                    onChange={registerDataChange}
                  />
                </div>
                <div className="field input-field">
                  <input
                    type={type}
                    placeholder="Password"
                    className="input"
                    name="password"
                    value={password}
                    required
                    onChange={registerDataChange}
                  />
                  {iconEyeSlash ? (
                    <FaEyeSlash
                      className="eye-icon"
                      onClick={() => {
                        setIconEyeSlash(false);
                        setType("text");
                      }}
                    />
                  ) : (
                    <FaEye
                      className="eye-icon"
                      onClick={() => {
                        setIconEyeSlash(true);
                        setType("password");
                      }}
                    />
                  )}
                </div>
                <div className="chose-avatar">
                  <img src={avatarPreview} alt="" />
                  <div className="button-avatar"></div>
                  <label htmlFor="avatar-file">Chose Your Avatar</label>
                  <input
                    type="file"
                    id="avatar-file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <div className="field input-field">
                  <button type="submit">Sign Up</button>
                </div>
              </form>
              <div className="form-link">
                <span>
                  Already have an account?
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
      )}
    </>
  );
};

export default LoginAndSignUp;
