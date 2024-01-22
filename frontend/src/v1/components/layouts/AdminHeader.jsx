import React from "react";
import "./admin-header.css";
import { Link } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <div className="admin-header">
      <FaBell />
      <div className="dropdown">
        <button
          className="btn btn-sm btn-outline-dark dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Admin
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
