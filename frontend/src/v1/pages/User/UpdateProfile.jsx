import React from "react";
import "./updateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="edit_profile">
      <form>
        <h5>update profile</h5>
        <input className="edit_profile_input" type="" />
        <input className="edit_profile_input" type="" />
        <div className="edit_profile_image">
          <input className="edit_profile_input" type="file" />
        </div>
        <input type="submit" placeholder="Submit" />
      </form>
    </div>
  );
};

export default UpdateProfile;
