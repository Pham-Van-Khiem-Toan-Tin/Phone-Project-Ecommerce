import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { getAccount } from "../../reduxToolkit/actions/userAction";
import "./profile.css";
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
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile">
          <div className="container">
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <span className="fw-bold">Home</span>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    account
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row mb-5">
              <div className="col-8">
                <label htmlFor="full-name" className="mb-1">
                  Full name: <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control mb-3"
                  disabled
                  id="full-name"
                  value={user?.name}
                />
                <label htmlFor="email" className="mb-1">
                  Email: <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control mb-3"
                  disabled
                  id="email"
                  value={user?.email}
                />
                <label htmlFor="created-at" className="mb-1">
                  Create At: <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control mb-3"
                  disabled
                  id="created-at"
                  value={user?.createdAt}
                />
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <Link to="/me/update" className="btn btn-sm btn-primary">Edit</Link>
                  <Link to="/password/update" className="btn btn-sm btn-primary">
                    Change password
                  </Link>
                </div>
              </div>
              <div className="col-4 d-flex flex-column align-items-center">
                <img
                  className="avatar rounded-5"
                  src={user?.avatar?.url}
                  alt={user?.name}
                />
                <p className="name">{user?.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
