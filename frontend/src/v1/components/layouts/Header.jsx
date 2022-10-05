import { Link, useLocation } from "react-router-dom";
import { FaBars, FaSearch, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import "./Header.css";
import InputSearch from "./InputSearch";
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
  const pathName = useLocation();
  const activeNav = menus.findIndex((menu) => menu.path === pathName);
  
  return (
    <header>
      <div className="menus container">
        <div className="menus-content">
          <button
            className="menu-icon-toggle"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#SideBar"
            aria-controls="SideBar"
          >
            <FaBars />
          </button>
          <div className="menu-brand">Shop</div>
          <ul className="menu-link">
            {menus.map((menu, index) => {
              return (
                <li key={index} className="menu-item">
                  <Link to={menu.path}>{menu.display}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="menus-brand">
          Shop
        </div>
        <div className="menus-search">
          <InputSearch />
        </div>
        <div className="menus-icon">
          <button
            className="search-icon"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#inputSearch"
            aria-controls="inputSearch"
          >
            <FaSearch />
          </button>
          <Link to="/user">
            <FaUserAlt />
          </Link>
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="SideBar"
        aria-labelledby="SideBar-label"
      >
        <div className="offcanvas-header sidebar-header">
          <h5 className="offcanvas-title" id="SideBar-label">
            Shop
          </h5>
          <button
            type="button"
            className="sidebar-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <BiX />
          </button>
        </div>
        <div className="offcanvas-body">
          <ul className="menus-sidebar">
            {menus.map((menu) => {
              return (
                <li key={menu.display}>
                  <Link to={menu.path}>{menu.display}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="inputSearch"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header input-search-header">
          <h5 className="offcanvas-title" id="offcanvasTopLabel">
          Search for the product you want
          </h5>
          <button
            type="button"
            className="input-search-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <BiX />
          </button>
        </div>
        <div className="offcanvas-body inputSearch-body">
          <div className="inputsearch-sidebar">
            <InputSearch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
