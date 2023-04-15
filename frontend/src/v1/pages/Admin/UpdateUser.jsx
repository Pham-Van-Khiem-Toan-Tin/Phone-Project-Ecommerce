import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import "./UpdateUser.css";
import { getUserDetail, updateUser } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/user/userDetailSlice";
const UpdateUser = () => {
  const dispatch = useDispatch();
  const { isLoading, user, error } = useSelector((state) => state.userDetail);
  const { isLoading: updateLoading, error: updateError } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { id } = useParams();
  useEffect(() => {
    if (!user) {
      dispatch(getUserDetail(id));
    } else {
      if (user._id !== id) {
        dispatch(getUserDetail(id));
      }
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch(clearError);
    }
  }, [dispatch, user, id]);
  const updateUserSubmitHandle = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("role",role);
    console.log({id, myForm});
    dispatch(updateUser({id,myForm}));
    console.log("chay den day");
  }
  return (
    <div className="updateUser">
      <form onSubmit={(e) => updateUserSubmitHandle(e)}>
        <label htmlFor="update-user-name" className="subTitle">
          Name
        </label>
        <input id="update-user-name" type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
        <label htmlFor="update-user-email" className="subTitle">
          Email
        </label>
        <input id="update-user-email" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        <label htmlFor="update-user-role" className="subTitle">
          Role
        </label>
        <select name="Role" id="update-user-role" value={role} onChange={(e) => {setRole(e.target.value)}}>
          <option value="">Choose Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
