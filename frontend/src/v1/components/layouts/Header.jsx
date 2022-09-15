import { Link, useLocation } from "react-router-dom";
import { FaBars, FaSearch, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./Header.css";
import { useState } from "react";
const menus = [
  {
    display: "Trang chủ",
    path: "/home",
  },
  {
    display: "Sản phẩm",
    path: "/categories",
  },
  {
    display: "Blog",
    path: "/blog",
  },
  {
    display: "Liên Hệ",
    path: "/contact",
  },
];

const Header = () => {
  const pathName = useLocation();
  const [sideBar, setSideBar] = useState(false);
  const [showInputSearch, setShowInputSearch] = useState(false);
  const activeNav = menus.findIndex((menu) => menu.path === pathName);
  const showSideBar = () => setSideBar(!sideBar);
  const closeSideBar = () => setSideBar(!sideBar);
  const handleInputSearch = () => {
    setShowInputSearch(!showInputSearch)
  }
  return (
    <header>
      <div className="container menu_container">
        <div className="brandAndToggle">
          <div className="menu_toggle" onClick={showSideBar}>
            <FaBars />
          </div>
          <div className="brand">
            <Link to="/">Shop</Link>
          </div>
        </div>
        <ul className={sideBar ? "submenu active-toggle" : "submenu"}>
          <div className="menu_toggle_close">
            <AiOutlineClose onClick={closeSideBar} />
          </div>
          {menus.map((menu, index) => {
            return (
              <li
                key={menu.path}
                className={`menu_children-1 ${
                  index === activeNav ? "active" : ""
                }`}
              >
                <Link to={menu.path} onClick={() => {
                  closeSideBar();
                  setShowInputSearch(false)
                }}>{menu.display}</Link>
              </li>
            );
          })}
        </ul>
        <div className="menu_icon">
          <div className="menu_search">
            <FaSearch onClick={handleInputSearch}/>
            <div className="menu_search_input" style={showInputSearch?{display: "block"}:{display:"none"}}>
              <input  type="text" />
            </div>
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
