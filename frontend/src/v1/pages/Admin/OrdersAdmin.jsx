import React, { useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { format } from "date-fns";

import { Link } from "react-router-dom";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "./all-orders.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../reduxToolkit/reducer/order/allOrders.slice";
import {
  deleteOrder,
  getAllOrders,
} from "../../reduxToolkit/actions/order.action";
import Loader from "../../components/Loader/Loader";
import {
  clearErrorOrder,
  deleteReset,
} from "../../reduxToolkit/reducer/order/orderSlice";
const OrdersAdmin = ({ SideBarComponent, HeaderComponent }) => {
  const dispatch = useDispatch();
  const { error, orders, isLoading } = useSelector((state) => state.allOrders);
  const {
    error: errorDelete,
    isLoading: isLoadingDlete,
    isDelete,
  } = useSelector((state) => state.order);
  const doughState = {
    // labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        label: "Quality:",
        data: [70, 100], // Đưa dữ liệu vào đây, ví dụ có 12 và 18 là 2 giá trị
        backgroundColor: ["#F45050", "#9384D1"],
        borderWidth: [0, 0],
      },
    ],
  };
  const doughState2 = {
    // labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        label: "Quality:",
        data: [30, 100], // Đưa dữ liệu vào đây, ví dụ có 12 và 18 là 2 giá trị
        backgroundColor: ["#F45050", "#9384D1"],
        borderWidth: [0, 0],
      },
    ],
  };
  const doughState3 = {
    // labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        label: "Quality:",
        data: [90, 10], // Đưa dữ liệu vào đây, ví dụ có 12 và 18 là 2 giá trị
        backgroundColor: ["#F45050", "#9384D1"],
        borderWidth: [0, 0],
      },
    ],
  };
  const optionsDoughnut = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };
  const barState = {
    labels: ["jan", "Feb", "Mar", "Apr", "May", "jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "All Order",
        backgroundColor: "#475be8",
        borderRadius: 2,
        hoverBackgroundColor: "#36429e",
        data: [60, 63, 81, 102, 80, 21, 72, 97, 34],
      },
      {
        label: "Order Success",
        backgroundColor: "#e3e6fc",
        borderRadius: 2,
        hoverBackgroundColor: "#989aa5",
        data: [40, 12, 24, 65, 39, 17, 62, 23, 26],
      },
    ],
  };
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Total Revenue",
        color: "#fff",
      },
    },
    elements: {
      line: {
        borderWidth: 0, // Bỏ đường kẻ
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // màu của đường kẻ trên trục x
        },
        barPercentage: 0.8,
        categoryPercentage: 1,
        ticks: {
          font: {
            size: 14, // kích thước chữ trên trục x
            family: "Arial", // font chữ trên trục x
          },
          color: "#7f7f8c", // màu của chữ trên trục x
        },
      },
      y: {
        grid: {
          display: false, // màu của đường kẻ trên trục y
        },
        ticks: {
          min: 0,
          font: {
            size: 14, // kích thước chữ trên trục y
            family: "Arial", // font chữ trên trục y
          },
          color: "#7f7f8c", // màu của chữ trên trục y
        },
        beginAtZero: true,
      },
    },
  };
  const optionLineUserPaid = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Conversion Insights",
        color: "#fff",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // màu của đường kẻ trên trục x
        },
        categoryPercentage: 1,
        ticks: {
          font: {
            size: 14, // kích thước chữ trên trục x
            family: "Arial", // font chữ trên trục x
          },
          color: "#7f7f8c", // màu của chữ trên trục x
        },
      },
      y: {
        grid: {
          display: false, // màu của đường kẻ trên trục y
        },
        ticks: {
          font: {
            size: 14, // kích thước chữ trên trục y
            family: "Arial", // font chữ trên trục y
          },
          color: "#7f7f8c", // màu của chữ trên trục y
        },
        beginAtZero: true,
      },
    },
  };
  const lineStateUserPaid = {
    labels: ["jan", "Feb", "Mar"],
    datasets: [
      {
        label: "All Orders",
        data: [20, 14, 36],
        backgroundColor: "#475be8",
        borderColor: "#475be8",
      },
      {
        label: "Delivered",
        data: [12, 8, 15],
        backgroundColor: "#e3e6fc",
        borderColor: "#e3e6fc",
      },
      {
        label: "Shipping",
        data: [14, 6, 12],
        backgroundColor: "#198754",
        borderColor: "#198754",
      },
      {
        label: "Canceled",
        data: [1, 3, 2],
        backgroundColor: "#fe1330",
        borderColor: "#fe1330",
      },
    ],
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (errorDelete) {
      toast.error(errorDelete);
      dispatch(clearErrorOrder());
    }
  }, [dispatch, error, errorDelete]);
  useEffect(() => {
    if (isDelete) {
      toast.success("Order is deleted!!!");
      dispatch(deleteReset());
    }
    dispatch(getAllOrders());
  }, [dispatch, isDelete]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SideBarComponent />
          <HeaderComponent />
          <div className="all-orders">
            <div className="d-flex align-items-center justify-content-between date-picker">
              <span>Orders</span>
              <select className="form-select">
                <option>Today</option>
                <option>Week</option>
                <option>Month</option>
              </select>
            </div>
            <div className="d-flex justify-content-between card-dashboard">
              <div className="item rounded d-flex align-items-center">
                <div className="item-content col-7">
                  <p className="title">New Orders</p>
                  <p className="total">4 Order</p>
                  <p className="notify">We have 4 new orders</p>
                </div>
                <div className="item-chart col-5">
                  <Doughnut data={doughState} options={optionsDoughnut} />
                </div>
              </div>
              <div className="item rounded d-flex align-items-center">
                <div className="item-content col-7">
                  <p className="title">Today Sales</p>
                  <p className="total">$100.0K</p>
                  <p className="notify">We have sold 18 items</p>
                </div>
                <div className="item-chart col-5">
                  <Doughnut data={doughState2} options={optionsDoughnut} />
                </div>
              </div>
              <div className="item rounded d-flex align-items-center">
                <div className="item-content col-7">
                  <p className="title">Conversion Insights</p>
                  <p className="total">$120.1K</p>
                  <p className="notify">We have sold 123 items</p>
                </div>
                <div className="item-chart col-5">
                  <Doughnut data={doughState3} options={optionsDoughnut} />
                </div>
              </div>
            </div>
            <div className="mt-2 insights-sold">
              <div className="rounded insights-chart p-1">
                <Line data={lineStateUserPaid} options={optionLineUserPaid} />
              </div>
              <div className="rounded insights-chart p-1 mt-2">
                <Bar data={barState} options={optionsBar} />
              </div>
            </div>
            <div className="last-orders p-2 mt-2 rounded">
              <div className="table-responsive">
                <p className="title">Last Orders</p>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Date</th>
                      <th scope="col">Customer name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.map((order) => {
                        return (
                          <tr>
                            <th scope="row">{order?._id}</th>
                            <td>{order?.orderItems.length}</td>
                            <td>
                              {format(new Date(order?.createdAt), "dd/MM/yyyy")}
                            </td>
                            <td>{order.user}</td>
                            <td>{order?.orderStatus}</td>
                            <td>{order?.totalPrice}</td>
                            <td className="action">
                              <span>
                                <Link to={`../admin/order/${order?._id}`}>
                                  <FaEdit />
                                </Link>
                              </span>
                              <span
                                className="text-danger"
                                onClick={() =>
                                  dispatch(deleteOrder(order?._id))
                                }
                              >
                                <FaTrashAlt />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrdersAdmin;
