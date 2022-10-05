import React from "react";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import "./About.css";
const About = () => {
  return (
    <div className="about">
      <div className="profile-admin">
        <div className="about-profile-content">My Profile</div>
        <div className="about-profile-body">
          <div className="about-admin-details">
            <img src="assets/images/contact/contact.jpg" alt="" />
            <div className="about-admin-name">Pham Khiem</div>
            <a href="https://www.instagram.com/phamkhiem2712/" target="blank">Visit Instagram</a>
            <div className="about-warning">
              This is website made by Pham Khiem. Dont coppy it.
            </div>
          </div>
          <div className="rule" style={{ alignSelf:"stretch",width: "2%", display: "flex", alignItems: "center", justifyContent:"center"}}>
            <div style={{
              width: "1px",
              height: "80%",
              backgroundColor:"#000"
            }}>
            </div>
          </div>
          <div className="about-admin-brands">
            <span>Our Brands</span>
            <a href="https://www.facebook.com/khiem2k1/" target="blank">
              <FaFacebookSquare className="about-facebook" />
            </a>
            <a href="https://www.youtube.com/" target="blank">
              <FaYoutube className="about-youtube" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
