import React, { useEffect, useState } from "react";
import "./update-password.css";
import InputPass from "../../components/InputPass/InputPass";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import {
  clearErrorHandle,
  updateReset,
} from "../../reduxToolkit/reducer/user/userHandle";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { FaKey } from "react-icons/fa";
const UpdatePassword = ({HeaderComponent, FooterComponent}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUpDate, error, isLoading } = useSelector(
    (state) => state.handleUser
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const changeOldPass = (e) => {
    setOldPassword(e.target.value);
  };
  const changNewPass = (e) => {
    setNewPassword(e.target.value);
  };
  const changeConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
  };
  const updatePasswordMe = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorHandle());
    }
    if (isUpDate) {
      toast.success("Password Changed");
      navigate("/account");
      dispatch(updateReset());
    }
  }, [dispatch, navigate, isUpDate, error]);

  return (
    <>
    <HeaderComponent />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="update-password">
          <form
            className="form-update rounded d-flex flex-column align-items-center justify-content-center"
            onSubmit={updatePasswordMe}
          >
            <div className="update-icon-box d-flex align-items-center justify-content-center rounded-circle">
              <div className="update-icon rounded-circle">
                <FaKey />
              </div>
            </div>
            <p className="title">Change Password</p>
            <p className="text-center title-content">
              Enter your new password below, we 're <br />
              just being extra safe
            </p>

            <InputPass
              title="Old password"
              id="old-password"
              value={oldPassword}
              onChange={changeOldPass}
              placeholder="Old password..."
            />
            <InputPass
              title="New password"
              id="new-password"
              value={newPassword}
              onChange={changNewPass}
              placeholder="New password..."
            />
            <InputPass
              title="Confirm password"
              id="confirm-password"
              value={confirmPassword}
              onChange={changeConfirmPass}
              placeholder="Confirm password..."
            />
            <input
              className="btn btn-sm btn-primary btn-submit"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      )}
      <FooterComponent />
    </>
  );
};

export default UpdatePassword;
