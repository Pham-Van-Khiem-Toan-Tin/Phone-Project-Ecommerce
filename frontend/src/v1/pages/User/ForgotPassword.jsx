import React, { useEffect, useState } from "react";
import "./forgotPassword.css";
import { FaMailBulk } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/user/forgotPasswordSlice";

const ForgotPassword = ({HeaderComponent, FooterComponent}) => {
    const dispatch = useDispatch();
    const {error, message, íLoading} = useSelector((state) => state.forgotPass);
    const [email, setEmail] = useState("");
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }
    useEffect(() => {
      if(error) {
        toast.error(error);
        dispatch(clearError());
      }
      if(message) {
        toast.success(message);
      }
    }, [dispatch, error, message])
    
  return (
    <>
    <HeaderComponent />
    <div className="forgot_password">
      <form onSubmit={forgotPasswordSubmit}>
        <h5>forgot password</h5>
        <div className="forgot_pass-box">
          <span className="icon_mail-forgot">
            <FaMailBulk />
          </span>
          <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
        </div>
        <input type="submit" value="Send Code" />
      </form>
    </div>
    <FooterComponent />
    </>
  );
};

export default ForgotPassword;
