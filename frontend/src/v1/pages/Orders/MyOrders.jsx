import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/order/myOrderSlice";
import { myOrders } from "../../reduxToolkit/actions/order.action";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./my-order.css";
const MyOrders = ({HeaderComponent, FooterComponent}) => {
  const dispatch = useDispatch();
  const { isLoading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch])
  

  return (
    <>
    <HeaderComponent />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="my-order">
          <div className="container table-responsive">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <span className="fw-bold">Home</span>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                orders
              </li>
            </ol>
          </nav>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Status</th>
                  <th scope="col">Item Qty</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows ? (
                  rows.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.status}</td>
                        <td>{item.itemsQty}</td>
                        <td>{item.amount}</td>
                        <td className="icon-handle_user">
                          <span>
                          <Link to={`/order/${item.id}`}>
                            <FaExternalLinkAlt />
                          </Link>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div>No order in your order</div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <FooterComponent />
    </>
  );
};

export default MyOrders;
