import React, { useEffect } from "react";
import "./OrderConfirm.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderConFirm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInFor, cartList, total } = useSelector((state) => state.cart);
  const address = `${shippingInFor.address}, ${shippingInFor.city}, ${shippingInFor.pinCode}, ${shippingInFor.country}`;
  useEffect(() => {
    if (!user) {
      navigate("../../login");
    }
  }, []);

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
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item.id_product.images[0].url}
                            className="img-fluid rounded-start"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              {item.id_product.name}
                            </h5>
                            <p className="card-text">
                              Price: {item.id_product.price} đ
                            </p>
                            <p className="card-text">
                              Quanlity: {item.quantity}
                            </p>
                            <p className="card-text">
                              Item total:{" "}
                              {item.id_product.price * item.quantity}
                            </p>
                          </div>
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
          <span>{total} đ</span>
        </div>
        <div className="total-price">
          <span>taxprice: </span>
          <span>0 đ</span>
        </div>
        <div className="rule"></div>
        <div className="total-price">
          <span>subTotal:</span>
          <span>{total} đ</span>
        </div>
        <button>
          Payment
        </button>
      </div>
    </div>
  );
};

export default OrderConFirm;
