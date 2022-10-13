import React from "react";
import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer" style={{color: "#fff"}}>
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">Home</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">Features</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">Pricing</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">FAQs</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">About</div>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">Home</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">Features</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">Pricing</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">FAQs</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">About</div>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">Home</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">Features</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">Pricing</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">FAQs</div>
                </li>
                <li className="nav-item mb-2">
                  <div className="nav-link p-0 ">About</div>
                </li>
              </ul>
            </div>

            <div className="col-md-5 offset-md-1 mb-3">
              <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                  />
                  <button className="btn btn-primary" type="button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2022 Company, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <div className="link-dark">
                  <BsTwitter />
                </div>
              </li>
              <li className="ms-3">
                <div className="link-dark">
                  <BsInstagram />
                </div>
              </li>
              <li className="ms-3">
                <div className="link-dark">
                  <BsFacebook />
                </div>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
