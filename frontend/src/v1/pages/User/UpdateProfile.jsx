import React, { useEffect, useState } from "react";
import "./update-profile.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from "../../reduxToolkit/actions/userAction";
import {
  clearErrorHandle,
  updateReset,
} from "../../reduxToolkit/reducer/user/userHandle";
import Validation from "../../utils/Validation";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpDate, error, isLoading } = useSelector(
    (state) => state.handleUser
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPre, setAvatarPre] = useState("/assets/images/Profile.png");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    if(name != user.name && email != user.email) {
      setErrors(Validation({name: name, email: email}))
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("avatar", avatar);
      dispatch(updateProfile(myForm));
    } else {
      toast.error("You have not changed the data");
    }
  };
  const updateProfileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPre(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPre(user.avatar.url);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrorHandle());
    }
    if (isUpDate) {
      toast.success("Update profile successfully!");
      navigate("/account");
      dispatch(updateReset());
    }
  }, [user, dispatch, error, isUpDate, navigate]);
  return (
    <div className="edit-profile">
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
              <li className="breadcrumb-item" aria-current="page">
                edit
              </li>
            </ol>
          </nav>
        </div>
        <form className="row mb-3" onSubmit={updateProfileSubmit}>
          <div className="col-12 col-md-8 order-2 order-md-1">
            <label htmlFor="full-name" className="mb-1">
              Full name: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              id="full-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name..."
            />
            {errors.name && <p className="errors" style={{color: "red"}}>{errors.name}</p>}

            <label htmlFor="email" className="mt-3 mb-1">
              Email: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email..."
            />
            {errors.email && <p className="errors" style={{color: "red"}}>{errors.email}</p>}
            <div className="d-flex mt-3 align-items-center justify-content-center gap-3">
              <input
                type="submit"
                className="btn btn-sm btn-primary edit-submit"
                value="Save"
              />
            </div>
          </div>
          <div className="col-12 col-md-4 order-1 order-md-2 d-flex flex-column align-items-center">
            <img
              className="avatar rounded-5"
              src={user?.avatar?.url}
              alt={user?.name}
            />
            <p className="name">{user?.name}</p>
          </div>
        </form>
      </div>
      {/* <form onSubmit={updateProfileSubmit}>
        <h5>update profile</h5>
        <input className="edit_profile_input" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name..." />
        <input className="edit_profile_input" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email..." />
        <div className="edit_profile_image">
          <img alt="edit_image" src={avatarPre}/>
          <label htmlFor="edit_profile_image">Chose image</label>
          <input id="edit_profile_image" type="file" onChange={updateProfileChange} />
        </div>
        <input className="edit_profile_submit" type="submit" value="Submit" />
      </form> */}
    </div>
  );
};

export default UpdateProfile;
