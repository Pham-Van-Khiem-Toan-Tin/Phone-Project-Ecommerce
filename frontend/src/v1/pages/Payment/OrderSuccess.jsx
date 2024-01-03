import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./orderSuccess.css";
import { Link } from "react-router-dom";
const OrderSuccess = ({ HeaderComponent, FooterComponent }) => {
  return (
    <>
      <HeaderComponent />
      <div className="order_success">
        <FaCheckCircle />
        <h5>Your Order has been Placed successfully</h5>
        <Link to="/orders">View Order</Link>
      </div>
      <FooterComponent />
    </>
  );
};

export default OrderSuccess;
