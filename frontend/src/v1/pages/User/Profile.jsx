import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { getAccount } from "../../reduxToolkit/actions/userAction";
import "./Profile.css";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated, accessToken } = useSelector(
    (state) => state.user
  );
  
  useEffect(() => {
      if(!user) {
        dispatch(getAccount());
      }
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile">
          <div className="user-avatar">
            <span>My Profile</span>
            <img src={user?.avatar?.url} alt={user?.name} />
            <button className="user-edit">Edit Profile</button>
          </div>
          <div className="user-profile-detail">
            <h2 className="user-name-title">Full Name</h2>
            <span className="user-name">{user?.name}</span>
            <h2 className="user-email-title">Email</h2>
            <span className="user-email">{user?.email}</span>
            <h2 className="user-join-title">Joined at</h2>
            <span className="user-join">{user?.createdAt}</span>
            <button>My order</button>
            <button>Change Password</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
