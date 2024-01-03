import React from "react";
import Steps from "../../components/Steps/Steps";
import "./order-confirm.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderConFirm = ({ HeaderComponent, FooterComponent }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInfor, cartList } = useSelector((state) => state.cart);
  const subtotal = cartList.reduce((acc, item) => {
    return acc + item.id_product.price * item.quantity;
  }, 0);
  const shippingCharges = subtotal > 100000000 ? 0 : 20000;
  const tax = subtotal * 0.008;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfor.address}, ${shippingInfor.city}, ${shippingInfor.pinCode}, ${shippingInfor.country}`;
  const processToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfor", JSON.stringify(data));
    navigate("../payment");
  };
  return (
    <>
      <HeaderComponent />
      <div className="order-confirm mb-5 container">
        <Steps step={2} />
        <div className="row mt-3">
          <div className="col-12 col-md-6 order-1 ps-0">
            <div className="shipping-info rounded ">
              <p className="fw-bold text-center">Shipping Info</p>
              <label htmlFor="name">
                Name: <span className="text-danger">*</span>
              </label>
              <input
                id="name"
                disabled
                value={user?.name}
                className="form-control"
              />
              <label htmlFor="phone">
                Phone: <span className="text-danger">*</span>
              </label>
              <input
                id="phone"
                disabled
                value={shippingInfor?.phoneNum}
                className="form-control"
              />
              <label htmlFor="address">
                Address: <span className="text-danger">*</span>
              </label>
              <textarea
                id="address"
                disabled
                value={address}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 order-3 order-md-2 pe-0">
            <div className="total rounded">
              <p className="fw-bold text-center">Total</p>
              <div className="total-field">
                <span>Total price: </span>
                <span>{subtotal} đ</span>
              </div>
              <div className="total-field">
                <span>Shipping charges: </span>
                <span>{shippingCharges} đ</span>
              </div>
              <div className="total-field">
                <span>Tax price: </span>
                <span>{tax} đ</span>
              </div>
              <div className="line"></div>
              <div className="total-field">
                <span>Total:</span>
                <span>{totalPrice} đ</span>
              </div>
              <button
                className="btn btn-primary btn-sm w-100 mt-2"
                onClick={processToPayment}
              >
                Payment
              </button>
            </div>
          </div>
          <div className="product-list col-12 order-2 order-md-3 rounded">
            <table className="table table-condensed table-responsive">
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Product</th>
                  <th style={{ width: "70%" }}>Name</th>
                  <th style={{ width: "10%" }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cartList &&
                  cartList.map((item) => {
                    return (
                      <tr key={item.id_product.name}>
                        <td data-th="Product">
                          <img
                            src={item.id_product.images[0].url}
                            className="rounded"
                            alt=""
                          />
                        </td>
                        <td data-th="Name">{item.id_product.name}</td>
                        <td data-th="Quanlity">{item.quantity}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="shippingInfor">
        <div className="shippingInfor-content">
          <h4>Shipping Infor:</h4>
          <div className="userInfor">
            <div>Name: {user?.name}</div>
            <div>Phone: {shippingInfor?.phoneNum}</div>
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
        <div className="vr"></div>
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
      </div> */}
      </div>
      <FooterComponent />
    </>
  );
};

export default OrderConFirm;
