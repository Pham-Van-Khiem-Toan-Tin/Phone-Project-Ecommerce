import { Link } from "react-router-dom";
import { BsSearch, BsFillPersonFill, BsFillCartFill } from "react-icons/bs";
import "./Header.css";
import { useState } from "react";
const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Brand
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
            </ul>
            <div className="menu-icon d-flex flex-row">
              <BsSearch className="fs-6 mx-1 my-auto" type="button" />
              <BsFillPersonFill className="fs-4 mx-1 my-auto" />
              <BsFillCartFill className="fs-5 mx-1 my-auto" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
