import React, { useEffect, useState } from "react";
import "./updatePassword.css";
import InputPass from "../../components/InputPass/InputPass";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import { clearErrorHandle, updateReset } from "../../reduxToolkit/reducer/user/userHandle";
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUpDate, error, isLoading } = useSelector((state) => state.handleUser);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const changeOldPass = (e) => {
    setOldPassword(e.target.value);
  }
  const changNewPass = (e) => {
    setNewPassword(e.target.value);
  }
  const changeConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
  }
  const updatePasswordMe = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  }
  useEffect(() => {
    console.log("chay zo day");
    if(error) {
      console.log("chay vao day");
      toast.error(error);
      dispatch(clearErrorHandle());
    }
    if(isUpDate) {
      toast.success("Password Changed");
      navigate("/account");
      dispatch(updateReset());
    }
  }, [dispatch, navigate, isUpDate, error])
  
  return (
    <div className="edit_password">
      <form onSubmit={updatePasswordMe}>
        <h5>Change Password</h5>
        <div className="box-input">
          <InputPass value={oldPassword} onChange={changeOldPass} placeholder="Old password..."  />
        </div>
        <div className="box-input">
          <InputPass value={newPassword} onChange={changNewPass} placeholder="New password..." />
        </div>
        <div className="box-input">
          <InputPass value={confirmPassword} onChange={changeConfirmPass} placeholder="Confirm password..." />
        </div>
        <input className="edit_profile_submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UpdatePassword;
