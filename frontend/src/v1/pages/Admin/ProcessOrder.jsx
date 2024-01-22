import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/order/orderDetailSlice";
import {
  orderDetail,
  updateOrder,
} from "../../reduxToolkit/actions/order.action";
import { Link, useParams } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import "./ProcessOrder.css";
import {
  clearErrorOrder,
  updateReset,
} from "../../reduxToolkit/reducer/order/orderSlice";
const ProcessOrder = ({ SideBarComponent, HeaderComponent }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, isLoading, order } = useSelector((state) => state.orderDetail);
  const {
    error: errorUpdate,
    isLoading: isLoadingUpdate,
    isUpdate,
  } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");
  const updateSubmitOrderHandle = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder({ myForm, id }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (errorUpdate) {
      toast.error(errorUpdate);
      dispatch(clearErrorOrder());
    }
  }, [error, dispatch, errorUpdate]);
  useEffect(() => {
    if (isUpdate) {
      toast.success("Order Changed!!!");
      dispatch(updateReset());
    }
    dispatch(orderDetail(id));
  }, [dispatch, id, isUpdate]);
  return (
    <>
      <SideBarComponent />
      <HeaderComponent />
      <div className="process_order">
        <div className="order_detail ">
          <h5>#Order: {order && order._id}</h5>
          <h5>Shipping Info</h5>
          <div className="order_detail_box">
            <div>
              <p>Name: </p> <span>{order.user && order.user.name}</span>
            </div>
            <div>
              <p>Phone: </p>{" "}
              <span>
                +84 {order.shippingInfor && order.shippingInfor.phoneNum}
              </span>
            </div>
            <div>
              <p>Address: </p>{" "}
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
            {order.orderItems &&
              order.orderItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/categories/${item.product}`}>
                    {item.name}
                  </Link>{" "}
                  <span>
                    {item.quantity} X {item.price} vnd ={" "}
                    <b>{item.quantity * item.price} vnd</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div
          className="process_order-handle"
          style={{
            display: order.orderStatus === "Delivered" ? "none" : "block",
          }}
        >
          <form onSubmit={updateSubmitOrderHandle}>
            <h5>Change Order</h5>
            <div>
              <FaBoxOpen />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Chose Status</option>
                {order.orderStatus === "Processing" && (
                  <option value="Shipped">Shipped</option>
                )}
                {order.orderStatus === "Shipped" && (
                  <option value="Delivered">Delivered </option>
                )}
              </select>
            </div>
            <button type="submit">Process</button>
          </form>
        </div>
      </div>
      ;
    </>
  );
};

export default ProcessOrder;
