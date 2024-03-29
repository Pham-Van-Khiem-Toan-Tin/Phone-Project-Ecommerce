import React, { useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaShippingFast,
  FaAlignLeft,
  FaAmazonPay,
  FaHeart,
  FaUser,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import { BiSolidDiscount, BiCartAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import "./header.css";
import { Link } from "react-router-dom";
import { logout } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import {
  clearError,
  logoutReset,
} from "../../reduxToolkit/reducer/user/userSlice";
import InputSearch from "../InputSearch/InputSearch";

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
  const { isAuthenticated, user, success, errorLogout } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      toast.success("Log out");
      dispatch(logoutReset());
    }
    if (errorLogout) {
      toast.error("Error");
      dispatch(clearError());
    }
  }, [success, dispatch, errorLogout]);

  return (
    <header>
      {/*top-menu*/}
      <div className="top-header">
        <div className="container d-flex align-items-center justify-content-between">
          <span className="welcome">Welcome to phone Shop!</span>
          <div className="info">
            <div className="d-flex align-items-center justify-content-center gap-1">
              <FaMapMarkerAlt />
              <span>
                Deliver to <span className="fw-bold">423651</span>
              </span>
            </div>
            <Link
              to="/orders"
              className="d-flex align-items-center justify-content-center gap-1"
            >
              <FaShippingFast /> Track your order
            </Link>
            <Link
              to="/discount"
              className="d-flex align-items-center justify-content-center gap-1"
            >
              <BiSolidDiscount /> All Offers
            </Link>
          </div>
        </div>
      </div>

      {/* bottom menu */}
      <div className="middle-header">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="toggle-menu-home d-flex align-items-center justify-content-center gap-2">
            <button
              className="btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#menuCanvas"
              aria-controls="menuCanvas"
            >
              <FaBars />
            </button>
            <Link to="/" className="logo">
              K-store
            </Link>
          </div>
          <InputSearch />
          <div className="group-account-cart d-flex align-items-center justify-content-center">
            <div className="dropdown rounded">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUser />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/login" className="rounded">
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="rounded">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <Link to="/wishlist" className="rounded">
              <FaHeart />
            </Link>
            <Link to="/cart" className="rounded">
              <FaShoppingCart />
            </Link>
          </div>
        </div>
      </div>

      {/* menu-group-categories */}
      <div className="bottom-header">
        <div className="container">
          <div className="row">
            <div className="col p-1">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-primary rounded dropdown-toggle active"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Iphone
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <div className="dropdown-item">Pro</div>
                  </li>
                  <li>
                    <div className="dropdown-item">Pro Max</div>
                  </li>
                  <li>
                    <div className="dropdown-item">Plus</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col p-1">
              <div className="dropdown">
                <button
                  className="btn btn-sm rounded dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  SamSung
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <div className="dropdown-item">Galaxy</div>
                  </li>
                  <li>
                    <div className="dropdown-item">Note</div>
                  </li>
                  <li>
                    <div className="dropdown-item">Flip</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col p-1">
              <div className="dropdown">
                <button
                  className="btn btn-sm rounded dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Oppo
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <div className="dropdown-item">Note</div>
                  </li>
                  <li>
                    <div className="dropdown-item">Another action</div>
                  </li>
                  <li>
                    <div className="dropdown-item">Something else here</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col p-1">
              <div className="dropdown">
                <button
                  className="btn btn-sm rounded dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Xiaomi
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <div className="dropdown-item">gamming</div>
                  </li>
                  <li>
                    <div className="dropdown-item">Note</div>
                  </li>
                  <li>
                    <div className="dropdown-item">Pro</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col p-1">
              <div className="dropdown">
                <button
                  className="btn btn-sm rounded dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Huawei
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <div className="dropdown-item">Mate</div>
                  </li>
                  <li>
                    <div className="dropdown-item">Another action</div>
                  </li>
                  <li>
                    <div className="dropdown-item">Something else here</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*menu canvas */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="menuCanvas"
        aria-labelledby="menuCanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="menuCanvasLabel">
            Welcome
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="dropdown mt-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Dropdown button
            </button>
            <ul className="dropdown-menu">
              <li>
                <div className="dropdown-item">Go to dashboard</div>
              </li>
              <li>
                <div className="dropdown-item">Home</div>
              </li>
              <li>
                <div className="dropdown-item">New product</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
