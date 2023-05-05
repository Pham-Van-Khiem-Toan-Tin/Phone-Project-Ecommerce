import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";
const OrderSuccess = () => {
  return (
    <div className="order_success">
      <FaCheckCircle />
      <h5>Your Order has been Placed successfully</h5>
      <Link to="/orders">View Order</Link>
    </div>
  );
};

export default OrderSuccess;
