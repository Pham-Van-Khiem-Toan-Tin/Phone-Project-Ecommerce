import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { getAccount } from "../../reduxToolkit/actions/userAction";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error]);
  useEffect(() => {
    dispatch(getAccount());
  }, [dispatch])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile">
          <div className="user-avatar">
            <span>My Profile</span>
            <img src={user?.avatar?.url} alt={user?.name} />
            <Link to='/me/update'>
              <button className="user-edit">Edit Profile</button>
            </Link>
          </div>
          <div className="user-profile-detail">
            <h2 className="user-name-title">Full Name</h2>
            <span className="user-name">{user?.name}</span>
            <h2 className="user-email-title">Email</h2>
            <span className="user-email">{user?.email}</span>
            <h2 className="user-join-title">Joined at</h2>
            <span className="user-join">{user?.createdAt}</span>
            <Link to="/orders">
              <button>My order</button>
            </Link>
            <Link to="/password/update">
              <button>Change Password</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
