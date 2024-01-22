import React, { useState } from "react";
import {
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobeAsia,
  FaRegBuilding,
} from "react-icons/fa";
import "./shipping.css";
import { useDispatch, useSelector } from "react-redux";
import { shippingInfoSubmit } from "../../reduxToolkit/reducer/product/cartProductSlice";
import { useNavigate } from "react-router-dom";
import Steps from "../../components/Steps/Steps";
const Shipping = ({ HeaderComponent, FooterComponent }) => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(
    shippingInfo ? shippingInfo?.address : ""
  );
  const [city, setCity] = useState(shippingInfo ? shippingInfo?.city : "");
  const [state, setState] = useState(shippingInfo ? shippingInfo?.state : "");
  const [country, setCountry] = useState(
    shippingInfo ? shippingInfo?.country : ""
  );
  const [pinCode, setPinCode] = useState(
    shippingInfo ? shippingInfo?.pinCode : ""
  );
  const [phone, setPhone] = useState(shippingInfo ? shippingInfo?.phone : "");
  const navigate = useNavigate();
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const formShipping = {
      address: address,
      city: city,
      state: state,
      country: "VN",
      phoneNum: phone,
      pinCode: pinCode,
    };
    dispatch(shippingInfoSubmit(formShipping));
    navigate("../order/confirm");
  };
  return (
    <>
      <HeaderComponent />
      <div className="shipping container">
        <Steps step={1} />
        <div className="row">
          <div className="col-6">
            <form onSubmit={handleShippingSubmit} className="rounded">
              <p className="text-center fw-bold">Shipping</p>
              <label htmlFor="address">
                Address: <span className="text-danger">*</span>
              </label>
              <div className="field">
                <FaHome />
                <input
                  className="form-control"
                  id="address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                />
              </div>
              <label htmlFor="city">
                City: <span className="text-danger">*</span>
              </label>
              <div className="field">
                <FaRegBuilding />
                <input
                  id="city"
                  className="form-control"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                  type=""
                  placeholder="City"
                />
              </div>
              <label htmlFor="state">
                State: <span className="text-danger">*</span>
              </label>
              <div className="field">
                <FaRegBuilding />
                <input
                  id="state"
                  className="form-control"
                  value={state}
                  required
                  onChange={(e) => setState(e.target.value)}
                  type=""
                  placeholder="State"
                />
              </div>
              <label htmlFor="pin-code">
                Pin code: <span className="text-danger">*</span>
              </label>
              <div className="field">
                <FaMapMarkerAlt />
                <input
                  id="pin-code"
                  className="form-control"
                  value={pinCode}
                  required
                  onChange={(e) => setPinCode(e.target.value)}
                  type=""
                  placeholder="Pin Code"
                />
              </div>
              <label htmlFor="phone-num">
                Country: <span className="text-danger">*</span>
              </label>
              <div className="field">
                <FaPhone />
                <input
                  id="phone-num"
                  className="form-control"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Phone Number"
                />
              </div>
              <label htmlFor="country">
                Country: <span className="text-danger">*</span>
              </label>
              <div className="field">
                <FaGlobeAsia />
                <input
                  id="country"
                  className="form-control"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                  type=""
                  placeholder="Country"
                />
              </div>
              <input
                className="btn btn-primary w-100"
                type="submit"
                value={"Continue"}
              />
            </form>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Shipping;
