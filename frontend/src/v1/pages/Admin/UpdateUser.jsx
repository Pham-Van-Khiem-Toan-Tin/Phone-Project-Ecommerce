import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./UpdateUser.css";
import { getUserDetail, updateUser } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/user/userDetailSlice";
import { clearErrorHandle, updateReset } from "../../reduxToolkit/reducer/user/userHandle";
const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user, error } = useSelector((state) => state.userDetail);
  const { isLoadingHandle, errorHandle, isUpDate } = useSelector(
    (state) => state.handleUser
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { id } = useParams();
  console.log(id);
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
      dispatch(clearError());
    }
    if(errorHandle) {
      toast.error(errorHandle);
      dispatch(clearErrorHandle)
    }
    if(isUpDate) {
      toast.success("Update user successfully!");
      navigate("../admin/allusers");
      dispatch(updateReset());
    }
  }, [dispatch, user, id, isUpDate, toast, error, errorHandle, navigate]);
  const updateUserSubmitHandle = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("role",role);
    dispatch(updateUser({id,myForm}));
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
