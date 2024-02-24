import React, { useState } from "react";
import "./side-bar.css";
import { Link } from "react-router-dom";
import {
  FaComment,
  FaLuggageCart,
  FaMicrosoft,
  FaPaintBrush,
  FaShoppingBag,
  FaUser,
  FaUserShield,
} from "react-icons/fa";
const AdminSideBar = () => {
  const [activeLink, setActiveLink] = useState(() => {
    const storedActiveLink = localStorage.getItem('activeLink');
    return storedActiveLink !== null ? parseInt(storedActiveLink) : 0;
  });
  let menus = [
    {
      link: "../../admin/dashboard",
      icon: FaMicrosoft,
      text: "Dashboard",
    },
    {
      link: "products",
      icon: FaShoppingBag,
      text: " Products",
    },
    {
      link: "../../admin/all-orders",
      icon: FaLuggageCart,
      text: "All Orders",
    },
    {
      link: "../../admin/all-users",
      icon: FaUser,
      text: "All Users",
    },
    {
      link: "../../admin/role-management",
      icon: FaUserShield,
      text: "Role Management",
    },
    {
      link: "../../admin/category",
      icon: FaLuggageCart,
      text: "Category",
    },
    {
      link: "../../admin/color",
      icon: FaPaintBrush,
      text: "Color",
    },
    {
      link: "../../admin/reviews",
      icon: FaComment,
      text: "Reviews",
    },
  ];
  const handleActiveMenu = (index) => {
    console.log(activeLink);
    console.log(index);
    setActiveLink(index);
    localStorage.setItem('activeLink', index.toString());
  }
  return (
    <section className="admin-side-bar col-3">
      <div className="brand">K-store</div>
      <div className="menus">
        {menus.map((menu, index) => {
          const IconComponent = menu.icon;
          if (menu.link === "products") {
            return (
              <div className="accordion accordion-flush" id="adminHeader">
                <div className="accordion-item menu-dropdown ">
                  <h2 className="accordion-header">
                    <button
                      className={"accordion-button collapsed rounded" + (index == activeLink ? " active" : "") }
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#item-one"
                      aria-expanded="false"
                      aria-controls="item-one"
                    >
                      <IconComponent /> {menu.text}
                    </button>
                  </h2>
                  <div
                    id="item-one"
                    className="accordion-collapse collapse"
                    data-bs-parent="#adminHeader"
                  >
                    <div className="accordion-body p-0">
                      <Link to="/admin/all-products" onClick={() => handleActiveMenu(index)} className="menu-sub-link">
                        All Products
                      </Link>
                      <Link to="/admin/new-product" onClick={() => handleActiveMenu(index)} className="menu-sub-link">
                        New Products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="menu-link" >
                <Link to={menu.link} onClick={() => handleActiveMenu(index)} className={"rounded" + (index == activeLink ? " active" : "")}>
                  <IconComponent /> <span>{menu.text}</span>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default AdminSideBar;
