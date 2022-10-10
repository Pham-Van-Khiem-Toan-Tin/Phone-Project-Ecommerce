import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
const Admin = () => {
  return (
    <div className="admin">
      <div className="dashboard-navbar">
        <div className="accordion" id="dashboard-menus">
          <div className="accordion-item">
            <h2 className="accordion-header" id="dashboard-menu-one">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Dashboard
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="dashboard-menu-one"
              data-bs-parent="#dashboard-menus"
            >
              <div className="accordion-body">
                <Link to="">Home</Link>
                <Link to="">Analytics</Link>
                <Link to="">Sales</Link>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="dashboard-menu-two">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Quick menu
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="dashboard-menu-two"
              data-bs-parent="#dashboard-menus"
            >
              <div className="accordion-body">
                <Link to="">Users</Link>
                <Link to="">Products</Link>
                <Link to="">Orders</Link>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="dashboard-menu-three">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Notfication
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="dashboard-menu-three"
              data-bs-parent="#dashboard-menus"
            >
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-body">
        <div className="dashboard-chart">

        </div>
      </div>
    </div>
  );
};

export default Admin;
