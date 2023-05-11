import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/order/orderDetailSlice";
import { orderDetail } from "../../reduxToolkit/actions/orderAction";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./OrderDetail.css";
const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, isLoading, order } = useSelector((state) => state.orderDetail);
  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  useEffect(() => {
    dispatch(orderDetail(id));
  }, [dispatch, id])
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="order_detail container">
          <h5>#Order: {order && order._id}</h5>
          <h5>Shipping Info</h5>
          <div className="order_detail_box">
            <div>
              <p>Name: </p> {" "}
              <span>{order.user && order.user.name}</span>
            </div>
            <div>
              <p>Phone: </p> {" "}
              <span>
                +84 {order.shippingInfor && order.shippingInfor.phoneNum}
              </span>
            </div>
            <div>
              <p>Address: </p> {" "}
              <span>
                {order.shippingInfor &&
                  `${order.shippingInfor.address}, ${order.shippingInfor.city}, ${order.shippingInfor.pinCode}, ${order.shippingInfor.country}`}
              </span>
            </div>
          </div>
          <h5>Payment</h5>
          <div className="order_detail_box">
            <div>
              <p
                className={
                  order.paymentInfor &&
                  order.paymentInfor.status === "succeeded"
                    ? "text-success"
                    : "text-danger"
                }
              >
                {order.paymentInfor && order.paymentInfor.status === "succeeded"
                  ? "PAID"
                  : "NOT PAID"}
              </p>
            </div>
            <div>
              <p>Amount: </p>
              <span>{order?.totalPrice} vnd</span>
            </div>
          </div>
          <h5>Order Status</h5>
          <div className="order_detail_box">
            <div>
              <p
                className={
                  order.orderStatus && order.orderStatus === "Delivered"
                    ? "greenColor"
                    : "redColor"
                }
              >
                {order?.orderStatus}
              </p>
            </div>
          </div>
          <div className="order_detail_cart_item">
            <h5>Order Items: </h5>
            {order.orderItems && order.orderItems.map((item) => (
                <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/categories/${item.product}`}>{item.name}</Link>{" "}
                    <span>{item.quantity} X {item.price} vnd = {" "} <b>{item.quantity * item.price} vnd</b></span>
                </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
