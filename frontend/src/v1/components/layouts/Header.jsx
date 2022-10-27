import React, { useState } from "react";
import {
  BsList,
  BsFillCartFill,
  BsBellFill,
  BsFillFilePersonFill,
  BsSearch,
} from "react-icons/bs";
import { useSelector } from "react-redux";

import "./Header.css";
import { Link } from "react-router-dom";

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
  // const pathName = useLocation();
  // const activeNav = menus.findIndex((menu) => menu.path === pathName);
  const {user} = useSelector((state) => state.user);
  // console.log({user: user});
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
            <BsList />
          </button>
        </div>

        <div className="navbar-brand">Shop</div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
          <div className="icon-search">
            <BsSearch />
          </div>
        </div>
        <div className="navbar_icon-group">
          <div className="icon-user">
            <Link to="/login">
              <BsFillFilePersonFill />
            </Link>
          </div>
          <div className="icon-cart">
            <Link to="/cart">
              <BsFillCartFill />
            </Link>
          </div>
          <div className="icon-bell">
            <Link to="/">
              <BsBellFill />
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
            Hello, Khiem
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {user !== null && user.role === "admin" && <><div className="title-menu">Admin menu</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link to="/admin/dasboard">DashBoard</Link>
            </li>
            <li className="list-group-item">
              <Link to="/admin/orders">Orders</Link>
            </li>
          </ul>
          <div className="accordion accordion-flush" id="menuAdmin">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-menuAdminOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-menuAdminItemOne"
                  aria-expanded="false"
                  aria-controls="flush-menuAdminItemOne"
                >
                  User
                </button>
              </h2>
              <div
                id="flush-menuAdminItemOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-menuAdminOne"
                data-bs-parent="#menuAdmin"
              >
                <div className="accordion-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <Link to="/admin/allusers">All User</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/admin/newproduct">Create User</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
          </div></>}
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
