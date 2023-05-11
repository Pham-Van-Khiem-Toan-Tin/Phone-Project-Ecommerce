import React, { useEffect, useRef, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { register, login } from "../../reduxToolkit/actions/userAction";
import { clearError, resetSuccess } from "../../reduxToolkit/reducer/user/userSlice";
import { toast } from "react-toastify";
import "./LoginAndSignUp.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputPass from "../../components/InputPass/InputPass";
const LoginAndSignUp = () => {
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
    if(successAu) {
      toast.success(message);
      dispatch(resetSuccess());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect, successAu ]);

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
                  <InputPass
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
                  <InputPass
                    value={password}
                    name="password"
                    onChange={registerDataChange}
                    placeholder="Password"
                  />
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
