import React, { useEffect, useState } from "react";
import "./updateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from "../../reduxToolkit/actions/userAction";
import { clearErrorHandle, updateReset } from "../../reduxToolkit/reducer/user/userHandle";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpDate, error, isLoading } = useSelector((state) => state.handleUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPre, setAvatarPre] = useState("/assets/images/Profile.png");
  const [avatar, setAvatar] = useState("");
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  }
  const updateProfileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2) {
        setAvatarPre(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  useEffect(() => {
    if(user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPre(user.avatar.url);
    }
    if(error) {
      toast.error(error);
      dispatch(clearErrorHandle());
    }
    if(isUpDate) {
      toast.success("Update profile successfully!");
      navigate("/account");
      dispatch(updateReset());
    }
  }, [user, dispatch, error, isUpDate, navigate]);
  return (
    <div className="edit_profile">
      <form onSubmit={updateProfileSubmit}>
        <h5>update profile</h5>
        <input className="edit_profile_input" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name..." />
        <input className="edit_profile_input" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email..." />
        <div className="edit_profile_image">
          <img alt="edit_image" src={avatarPre}/>
          <label htmlFor="edit_profile_image">Chose image</label>
          <input id="edit_profile_image" type="file" onChange={updateProfileChange} />
        </div>
        <input className="edit_profile_submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UpdateProfile;
