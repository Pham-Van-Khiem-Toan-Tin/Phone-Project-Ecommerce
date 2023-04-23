import React, { useEffect } from "react";
import "./OrderConfirm.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderConFirm = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);
  const {shippingInFor, cartList} = useSelector((state) => state.cart);
  const address = `${shippingInFor.address}, ${shippingInFor.city}, ${shippingInFor.pinCode}, ${shippingInFor.country}`;
  useEffect(() => {
    if(!user) {
      navigate("../../login");
    } 
  }, [])
  
  return (
    <div className="orderconfirm">
      <div className="shippingInfor">
        <div className="shippingInfor-content">
          <h4>Shipping Infor:</h4>
          <div className="userInfor">
            <div>Name: {user?.name}</div>
            <div>Phone: {shippingInFor?.phoneNum}</div>
            <div>Address: {address}</div>
          </div>
          <h4>Your Cart Items</h4>
          <div className="cart-list">
            
          </div>
        </div>
        <div class="vr"></div>
      </div>
      <div className="total">
        <h4>Total</h4>
      </div>
    </div>
  );
};

export default OrderConFirm;
