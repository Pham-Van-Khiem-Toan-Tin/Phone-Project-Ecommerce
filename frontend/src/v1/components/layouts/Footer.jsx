import React from "react";
import { BsCCircle } from "react-icons/bs";
import AppStore from "../../images/dowload-apps/app-store.png";
import GooglePlay from "../../images/dowload-apps/google-play.png";

import { FaAmazonPay, FaPhoneVolume, FaWhatsapp } from "react-icons/fa";
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
            <div className="footer-contact mb-3">
              <div className="title mb-3">
                <span>Contact Us</span>
              </div>
              <div className="info-list">
                <div className="info-item d-flex gap-1 mb-2">
                  <FaWhatsapp />
                  <div className="item-content d-flex flex-column">
                    <span>whats App</span>
                    <span>+1 202-918-2132</span>
                  </div>
                </div>
                <div className="info-item d-flex gap-1">
                  <FaPhoneVolume />
                  <div className="item-content d-flex flex-column">
                    <span>whats App</span>
                    <span>+1 202-918-2132</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-apps">
              <div className="title mb-2">
                <span>Dowload App</span>
              </div>
              <div className="app-button-group d-flex gap-1">
                <button className="btn btn-sm">
                  <img src={AppStore} alt="app-store" />
                </button>
                <button className="btn btn-sm">
                  <img src={GooglePlay} alt="google-play" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-3">
            
          </div>
          <div className="col-3"></div>
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
