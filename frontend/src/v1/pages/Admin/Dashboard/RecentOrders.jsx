import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../reduxToolkit/actions/order.action";
import { format } from "date-fns";
import { useState } from "react";

const RecentOrders = () => {
  const { orders, resultPerPage, filteredOrdersCount } = useSelector(
    (state) => state.allOrders
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  useEffect(() => {
    const storedCurrentPage = JSON.parse(localStorage.getItem("all-orders"));
    setCurrentPage(storedCurrentPage || 1);
    dispatch(getAllOrders(currentPage));
  }, [dispatch, currentPage]);

  return (
    <>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Quantity</th>
            <th scope="col">Date</th>
            <th scope="col">Customer name</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr>
                  <th scope="row">{order?._id}</th>
                  <td>{order?.orderItems.length}</td>
                  <td>{format(new Date(order?.createdAt), "dd/MM/yyyy")}</td>
                  <td>{order.user}</td>
                  <td>{order?.orderStatus}</td>
                  <td>{order?.totalPrice}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            disabled={currentPage > 1 ? false : true}
            onClick={() => {
              if (currentPage > 1) {
                localStorage.setItem("all-orders", currentPage - 1);
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button className="page-link active" disabled={true}>
            {currentPage}
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            disabled={
              orders?.length !== resultPerPage &&
              filteredOrdersCount - currentPage * resultPerPage <= 0
            }
            onClick={() => {
              if (
                orders?.length === resultPerPage &&
                filteredOrdersCount - currentPage * resultPerPage > 0
              ) {
                localStorage.setItem("all-orders", currentPage + 1);
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </>
  );
};

export default RecentOrders;
