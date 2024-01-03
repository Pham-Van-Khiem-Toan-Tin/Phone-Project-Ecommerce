import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./resetPassword.css";
import InputPass from "../../components/InputPass/InputPass";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/user/forgotPasswordSlice";

const ResetPassword = ({HeaderComponent, FooterComponent}) => {
  const dispatch = useDispatch();
  const { error, message, isLoading, success } = useSelector(
    (state) => state.forgotPass
  );
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChangeNewPass = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmNewPass = (e) => {
    setConfirmPassword(e.target.value);
  };
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword({token, myForm }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success("Create password successfully");
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);
  return (
    <div className="new_password">
      <form onSubmit={resetPasswordSubmit}>
        <h5>Create Password</h5>
        <div className="new_password-box">
          <InputPass
            value={password}
            onChange={handleChangeNewPass}
            placeholder="New Password..."
          />
        </div>
        <div className="new_password-box">
          <InputPass
            value={confirmPassword}
            onChange={handleConfirmNewPass}
            placeholder="Confirm Password..."
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ResetPassword;
