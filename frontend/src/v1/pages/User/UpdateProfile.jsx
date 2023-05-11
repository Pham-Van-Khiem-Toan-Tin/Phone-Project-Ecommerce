import React, { useEffect, useState } from "react";
import "./updateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imagePre, setImagePre] = useState("");
  const [first, setfirst] = useState("");
  useEffect(() => {
    if(user) {
      setName(user.name);
      setEmail(user.email);
      setImagePre(user.avatar.url)
    }
  }, [user]);
  return (
    <div className="edit_profile">
      <form>
        <h5>update profile</h5>
        <input className="edit_profile_input" value={name} type="text" placeholder="Name..." />
        <input className="edit_profile_input" value={email} type="email" placeholder="Email..." />
        <div className="edit_profile_image">
          <img alt="" />
          <label htmlFor="edit_profile_image">Chose image</label>
          <input id="edit_profile_image" type="file" />
        </div>
        <input className="edit_profile_submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UpdateProfile;
