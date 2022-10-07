import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./Profile.css";
const Profile = () => {
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const history = useNavigate()
  useEffect(() => {
    if (isAuthenticated === false) {
      history("/login");
      window.onpopstate = () => {
        history(-1);
      }
      console.log(history);
    }
  }, [history, isAuthenticated]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile">
          <div className="user-avatar">
            <span>My Profile</span>
            <img src="assets/images/contact/contact.jpg" alt="" />
            <button className="user-edit">Edit Profile</button>
          </div>
          <div className="user-profile-detail">
            <h2 className="user-name-title">Full Name</h2>
            <span className="user-name">Pham Van Khiem</span>
            <h2 className="user-email-title">Email</h2>
            <span className="user-email">phamkhiemhust2001@gmail.com</span>
            <h2 className="user-join-title">Joined at</h2>
            <span className="user-join">00:00 27/12/2001</span>
            <button>My order</button>
            <button>Change Password</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
