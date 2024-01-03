import React from "react";
import "./admin-header.css";
import { Link } from "react-router-dom";
import { FaComment, FaLuggageCart, FaMicrosoft, FaShoppingBag, FaUser } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <section className="admin-header col-3">
      <div className="brand">Shop phone</div>
      <div className="menus">
        <div className="menu-link">
          <Link to="../../admin/dashboard" className="rounded active">
            <FaMicrosoft /> <span>Dashboard</span> 
          </Link>
        </div>
        <div className="accordion accordion-flush" id="adminHeader">
          <div className="accordion-item menu-dropdown">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#item-one"
                aria-expanded="false"
                aria-controls="item-one"
              >
              <FaShoppingBag /> {" Products"}
              </button>
            </h2>
            <div
              id="item-one"
              className="accordion-collapse collapse"
              data-bs-parent="#adminHeader"
            >
              <div className="accordion-body p-0">
                <Link to="/admin/all-products" className="menu-sub-link">
                  All Products
                </Link>
                <Link to="/admin/new-product" className="menu-sub-link">
                  New Products
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-link">
          <Link to="../../admin/all-orders" className="menu-link rounded">
           <FaLuggageCart /> <span>All Orders</span> 
          </Link>
        </div>
        <div className="menu-link">
          <Link to="../../admin/all-users" className="menu-link rounded">
            <FaUser /> <span>All Users</span> 
          </Link>
        </div>
        <div className="menu-link">
          <Link to="../../admin/all-users" className="menu-link rounded">
           <FaComment /> <span>Reviews</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdminHeader;
