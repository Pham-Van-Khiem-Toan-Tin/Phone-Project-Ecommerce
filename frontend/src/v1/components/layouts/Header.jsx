import { Link, useLocation } from "react-router-dom";
import { FaBars, FaSearch, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./Header.css";
import { useState } from "react";
;
const menus = [
  {
    display: "Trang chu",
    path: "/",
  },
  {
    display: "San pham",
    path: "/categories",
  },
  {
    display: "Blog",
    path: "/blog",
  },
  {
    display: "Lien He",
    path: "/contact",
  },
];

const Header = () => {
  const pathName = useLocation();
  const [sideBar, setSideBar] = useState(false);
 

  const activeNav = menus.findIndex(menu => menu.path === pathName);
  const showSideBar = () => setSideBar(!sideBar);
  const closeSideBar = () => setSideBar(!sideBar);
  return (
    <header>
      <div className="container menu_container">
        <div className="brandAndToggle">
          <div className="menu_toggle" onClick={showSideBar}>
            <FaBars/>
          </div>
          <div className="brand">
            <Link to="/">
              Shop
            </Link>
          </div>
        </div>
        <ul className={sideBar ?"submenu active-toggle":"submenu"}>
          <div className="menu_toggle_close">
            <AiOutlineClose onClick={closeSideBar}/>
          </div>
          {menus.map((menu, index) => {
            return (
              <li key={index} className={`menu_children-1 ${index === activeNav ? "active": ""}`}>
                <Link to={menu.path}>{menu.display}</Link>
              </li>
            );
          })}
        </ul>
        <div className="menu_icon">
          <div className="menu_search">
            <FaSearch />
            <input className="menu_search_input" type="text"/>
          </div>
          <Link to="/user">
            <FaUserAlt />
          </Link>
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
