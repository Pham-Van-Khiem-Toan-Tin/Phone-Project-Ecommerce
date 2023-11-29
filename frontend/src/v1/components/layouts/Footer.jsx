import React from "react";
import { BsTwitter, BsInstagram, BsFacebook, BsCCircle } from "react-icons/bs";
import { FaAmazonPay } from "react-icons/fa";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer" style={{ color: "#fff" }}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="footer-brand">
              <FaAmazonPay />
            </div>
            <div className="footer-contact">
              <div className="label">
                <span>Contact Us</span>
              </div>
              <div className="whats-app d-flex">
                
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <span className="col text-center pt-1">
            <BsCCircle /> 2023 All rights reversed. Reliance Retail Ltd.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
