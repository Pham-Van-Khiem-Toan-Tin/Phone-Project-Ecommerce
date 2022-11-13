import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./UpdateUser.css";
const UpdateUser = () => {
  const dispatch = useDispatch();
  const {isLoading, user, error} = useSelector((state) => state.userDetail);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();

  return (
    <div className="updateUser">
      <form>
        <label htmlFor="update-user-name" className="subTitle">
          Name
        </label>
        <input id="update-user-name" type="text" />
        <label htmlFor="update-user-email" className="subTitle">
          Email
        </label>
        <input id="update-user-email" type="email" />
        <label htmlFor="update-user-role" className="subTitle">
          Role
        </label>
        <select name="Role" id="update-user-role">
          <option value="">Choose role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" class="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
