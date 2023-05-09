import React, { useEffect, useState } from "react";

import {
  FaBars,
  FaUserAlt,
  FaShoppingCart,
  FaBell,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import { Link } from "react-router-dom";
import { logout } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import { clearError, logoutReset } from "../../reduxToolkit/reducer/user/userSlice";

const menus = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Categories",
    path: "/categories",
  },
  {
    display: "About",
    path: "/about",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const { isAuthenticated, user, success, errorLogout } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if(success) {
      toast.success("Log out");
      dispatch(logoutReset());
    }
    if(errorLogout) {
      toast.error("Error");
      dispatch(clearError());
    }
  }, [success, dispatch, errorLogout])
  
  return (
    <header>
      <div className="navbar-container container">
        <div className="icon-toggle">
          <button
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navSidebar"
            aria-controls="Sidebar"
          >
            <FaBars />
          </button>
          <div className="navbar-brand">
            <span>Shop</span>
          </div>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="search-input"
          />
          <div className="icon_input-search">
            <FaSearch />
          </div>
        </div>
        <div className="navbar_icon-group">
          <div className="icon-user">
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserAlt />
              </button>
              <ul className="dropdown-menu">
                {isAuthenticated ? (
                  <>
                    <li>
                      <div className="dropdown-item">
                        <Link to="/account">Account</Link>
                      </div>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => dispatch(logout())}>
                        Log out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <div className="dropdown-item">
                        <Link to="/login">
                          <span>Login/Sign up</span>
                        </Link>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="icon-cart">
            <Link to="/cart">
              <span>
                <FaShoppingCart />
              </span>
            </Link>
          </div>
          <div className="icon-bell">
            <Link to="/">
              <span>
                <FaBell />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="navSidebar"
        aria-labelledby="SidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="SidebarLabel">
            Hello, {user?.name ? user?.name : "User"}
          </h5>
          <button
            type="button"
            className="btn"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
        <div className="offcanvas-body">
          {user?.role === "admin" && (
            <>
              <div className="title-menu">Admin menu</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Link to="/admin/dashboard">DashBoard</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin/product/orders">Orders</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin/allusers">User</Link>
                </li>
              </ul>
              <div className="accordion accordion-flush" id="menuAdmin">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-menuAdminTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-menuAdminItemTwo"
                      aria-expanded="false"
                      aria-controls="flush-menuAdminItemTwo"
                    >
                      Product
                    </button>
                  </h2>
                  <div
                    id="flush-menuAdminItemTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-menuAdminTwo"
                    data-bs-parent="#menuAdmin"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <Link to="/admin/allproducts">All Product</Link>
                        </li>
                        <li className="list-group-item">
                          <Link to="/admin/newproduct">Create Product</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="title-menu">User Menu</div>
          <ul className="list-group list-group-flush">
            {menus.map((menu) => {
              return (
                <li className="list-group-item" key={menu.path}>
                  <Link to={menu.path}>{menu.display}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
