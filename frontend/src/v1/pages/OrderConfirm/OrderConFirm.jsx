import React, { useEffect } from "react";
import "./OrderConfirm.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const OrderConFirm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInFor, cartList } = useSelector((state) => state.cart);
  const subtotal = cartList.reduce((acc,item) => { return acc + item.id_product.price * item.quantity},0);
  const shippingCharges = subtotal > 100000000 ? 0 : 20000;
  const tax = subtotal * 0.008;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInFor.address}, ${shippingInFor.city}, ${shippingInFor.pinCode}, ${shippingInFor.country}`;
  const processToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice
    }
    sessionStorage.setItem("orderInfor", JSON.stringify(data));
    navigate("../payment")
  }
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
            {cartList &&
              cartList.map((item) => {
                return (
                  <>
                    <div className="card-shipping">
                      <img src={item.id_product.images[0].url} alt=""/>
                      <div className="card-shipping-content">
                        <h4>{item.id_product.name}</h4>
                        <div className="sum-price">
                        <h5>Price: {item.id_product.price} đ</h5>
                        <h5>Quanlity: {item.quantity}</h5>
                        <h5>Item total:{" "}
                              {item.id_product.price * item.quantity} đ</h5>

                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div class="vr"></div>
      </div>
      <div className="total">
        <h4>Total</h4>
        <div className="total-price">
          <span>total price: </span>
          <span>{subtotal} đ</span>
        </div>
        <div className="total-price">
          <span>Shipping Charges: </span>
          <span>{shippingCharges} đ</span>
        </div>
        <div className="total-price">
          <span>taxprice: </span>
          <span>{tax} đ</span>
        </div>
        <div className="rule"></div>
        <div className="total-price">
          <span>subTotal:</span>
          <span>{totalPrice} đ</span>
        </div>
        <button onClick={processToPayment}>
          Payment
        </button>
      </div>
    </div>
  );
};

export default OrderConFirm;
