import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./Profile.css";
const Profile = () => {
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  console.log(user);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
      // console.log(navigate);
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile">
          <div className="user-avatar">
            <span>My Profile</span>
            <img src={user.avatar.url} alt={user.name} />
            <button className="user-edit">Edit Profile</button>
          </div>
          <div className="user-profile-detail">
            <h2 className="user-name-title">Full Name</h2>
            <span className="user-name">{user.name}</span>
            <h2 className="user-email-title">Email</h2>
            <span className="user-email">{user.email}</span>
            <h2 className="user-join-title">Joined at</h2>
            <span className="user-join">{user.createdAt}</span>
            <button>My order</button>
            <button>Change Password</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
