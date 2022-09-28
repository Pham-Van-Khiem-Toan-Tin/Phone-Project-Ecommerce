import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <div className="Footer">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <div  className="nav-link px-2">
                Home
              </div>
            </li>
            <li className="nav-item">
              <div  className="nav-link px-2">
                Features
              </div>
            </li>
            <li className="nav-item">
              <div  className="nav-link px-2">
                Pricing
              </div>
            </li>
            <li className="nav-item">
              <div  className="nav-link px-2">
                FAQs
              </div>
            </li>
            <li className="nav-item">
              <div  className="nav-link px-2">
                About
              </div>
            </li>
          </ul>
          <p className="text-center">© 2022 Company, Inc</p>
        </footer>
      </div>
    </>
  );
};

export default Footer;
