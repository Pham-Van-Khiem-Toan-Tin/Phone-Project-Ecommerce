import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/order/orderDetailSlice";
import { orderDetail } from "../../reduxToolkit/actions/order.action";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./order-detail.css";
import { FaCommentMedical, FaEdit } from "react-icons/fa";
const OrderDetail = ({ HeaderComponent, FooterComponent }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, isLoading, order } = useSelector((state) => state.orderDetail);
  useEffect(() => {
    console.log({ order });
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  useEffect(() => {
    dispatch(orderDetail(id));
  }, [dispatch, id]);

  return (
    <>
      <HeaderComponent />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="order-detail container">
          <h5>#Order: {order && order._id}</h5>
          <h5>Shipping Info</h5>
          <div className="order_detail_box">
            <div>
              <p>Name: </p> <span>{order?.user && order?.user?.name}</span>
            </div>
            <div>
              <p>Phone: </p>{" "}
              <span>
                +84 {order?.shippingInfo && order?.shippingInfo?.phoneNum}
              </span>
            </div>
            <div>
              <p>Address: </p>{" "}
              <span>
                {order.shippingInfo &&
                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
              </span>
            </div>
          </div>
          <h5>Payment</h5>
          <div className="order_detail_box">
            <div>
              <p
                className={
                  order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "text-success"
                    : "text-danger"
                }
              >
                {/* {order.paymentInfo ? order.paymentInfo.status : "123"} */}
                {order.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? "PAID"
                  : "NOT PAID"}
              </p>
            </div>
            <div>
              <p>Amount: </p>
              <span>{Math.round(order?.totalPrice / 23000)} $</span>
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
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Imgae</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <tr key={item.product}>
                        <td>
                          <img src={item.image} alt="Product" />
                        </td>
                        <td>
                        <Link to={`/categories/${item.product}`}>
                          {item.name}
                        </Link>

                        </td>
                        <td>
                        {item.quantity} X
                        </td>
                        <td>
                        {Math.round(item.price / 23000)} $
                        </td>
                        <td>{item.quantity * Math.round(item.price / 23000)} $</td>
                        <td><button className="btn btn-sm"><FaCommentMedical /></button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <FooterComponent />
    </>
  );
};

export default OrderDetail;
