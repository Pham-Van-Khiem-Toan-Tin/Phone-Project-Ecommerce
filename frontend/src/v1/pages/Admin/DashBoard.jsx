import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Chart from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "./dashboard.css";
import { allUser } from "../../reduxToolkit/actions/userAction";
import { getAdminProducts } from "../../reduxToolkit/actions/productAction";
import { getAllOrders } from "../../reduxToolkit/actions/orderAction";
const DashBoard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const { products } = useSelector((state) => state.allProductAdmin);
  const { orders } = useSelector((state) => state.allOrders);
  let outOfStock = 0;
  products?.forEach((item) => {
    if (item.stock === 0) {
      outOfStock++;
    }
  });
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  // const lineState = {
  //   labels: ["InitialAmount", "Amount Earn"],
  //   datasets: [
  //     {
  //       backgroundColor: "#FF6D60",
  //       label: "TOTAL AMOUNT",
  //       data: [0, totalAmount],
  //       fill: false,
  //       borderColor: "#fff",
  //     },
  //   ],
  // };
  const doughState = {
    // labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        label: "Quanlity:",
        data: [70, 100], // Đưa dữ liệu vào đây, ví dụ có 12 và 18 là 2 giá trị
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
        label: "Profit",
        backgroundColor: "#475be8",
        borderRadius: 2,
        hoverBackgroundColor: "#36429e",
        // hoverBorderColor: "rgba(75,192,192,1)",
        data: [60, 80, 100, 60, 20, 70],
      },
      {
        label: "Lose",
        backgroundColor: "#e3e6fc",
        borderRadius: 2,
        hoverBackgroundColor: "#989aa5",
        // hoverBorderColor: "rgba(255,99,132,1)",
        data: [60, 80, 100, 60, 20, 70],
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
          stepSize: 20,
          callback: function (value) {
            return value.toLocaleString() + "k"; // Hiển thị giá trị chia 1000 và thêm 'K'
          },
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
  // const optionsLine = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       labels: {
  //         font: {
  //           size: 16, // kích thước chữ
  //           family: "Arial", // font chữ
  //         },
  //         color: "#fff", // màu chữ
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       grid: {
  //         color: "#fff", // màu của đường kẻ trên trục x
  //       },
  //       ticks: {
  //         font: {
  //           size: 14, // kích thước chữ trên trục x
  //           family: "Arial", // font chữ trên trục x
  //         },
  //         color: "#fff", // màu của chữ trên trục x
  //       },
  //     },
  //     y: {
  //       grid: {
  //         color: "#fff", // màu của đường kẻ trên trục y
  //       },
  //       ticks: {
  //         font: {
  //           size: 14, // kích thước chữ trên trục y
  //           family: "Arial", // font chữ trên trục y
  //         },
  //         color: "#fff", // màu của chữ trên trục y
  //       },
  //       beginAtZero: true,
  //     },
  //   },
  // };
  useEffect(() => {
    dispatch(allUser());
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-9 pt-5 px-5">
          <div className="d-flex align-items-center justify-content-between date-picker">
            <span>Dashboard</span>
            <select className="form-select">
              <option>Today</option>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div className="d-flex justify-content-between card-dashboard">
            <div className="item rounded d-flex align-items-center">
              <div className="item-content col-7">
                <p className="title">Today Sales</p>
                <p className="total">$100.0K</p>
                <p className="notify">We have sold 123 items</p>
              </div>
              <div className="item-chart col-5">
                <Doughnut data={doughState} options={optionsDoughnut} />
              </div>
            </div>
            <div className="item rounded d-flex align-items-center">
              <div className="item-content col-7">
                <p className="title">Today Sales</p>
                <p className="total">$100.0K</p>
                <p className="notify">We have sold 123 items</p>
              </div>
              <div className="item-chart col-5">
                <Doughnut data={doughState} options={optionsDoughnut} />
              </div>
            </div>
            <div className="item rounded d-flex align-items-center">
              <div className="item-content col-7">
                <p className="title">Today Sales</p>
                <p className="total">$100.0K</p>
                <p className="notify">We have sold 123 items</p>
              </div>
              <div className="item-chart col-5">
                <Doughnut data={doughState} options={optionsDoughnut} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2 revenue-sold">
            <div className="rounded revenue-chart p-1">
              <Bar data={barState} options={optionsBar} />
            </div>
            <div className="sold-chart rounded p-2">
              <p className="title">Most Sold Items</p>
              <div className="d-flex justify-content-between mb-1">
                <span>SAMSUNG</span>
                <span>70%</span>
              </div>
              <div
                className="progress mb-3"
                role="progressbar"
                aria-label="Example 1px high"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ height: "7px" }}
              >
                <div className="progress-bar" style={{ width: "70%" }}></div>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>SAMSUNG</span>
                <span>70%</span>
              </div>
              <div
                className="progress mb-3"
                role="progressbar"
                aria-label="Example 1px high"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ height: "7px" }}
              >
                <div className="progress-bar" style={{ width: "25%" }}></div>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>SAMSUNG</span>
                <span>70%</span>
              </div>
              <div
                className="progress mb-3"
                role="progressbar"
                aria-label="Example 1px high"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ height: "7px" }}
              >
                <div className="progress-bar" style={{ width: "35%" }}></div>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>SAMSUNG</span>
                <span>70%</span>
              </div>
              <div
                className="progress mb-3"
                role="progressbar"
                aria-label="Example 1px high"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ height: "7px" }}
              >
                <div className="progress-bar" style={{ width: "40%" }}></div>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>SAMSUNG</span>
                <span>70%</span>
              </div>
              <div
                className="progress mb-3"
                role="progressbar"
                aria-label="Example 1px high"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ height: "7px" }}
              >
                <div className="progress-bar" style={{ width: "80%" }}></div>
              </div>
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
                          <td>{format(new Date(order?.createdAt), "dd/MM/yyyy")}</td>
                          <td>{order.user}</td>
                          <td>{order?.orderStatus}</td>
                          <td>{order?.totalPrice}</td>
                          <td>@mdo</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container"> */}
      {/* <div className="dashboard_summary">
          <p>
            Total Amount: <br /> {totalAmount} VND
          </p>
        </div>
        <div className="dashboard_summary2">
          <Link to="/admin/allproducts">
            <p>Products</p>
            <p>{products?.length}</p>
          </Link>
          <Link to="/admin/product/orders">
            <p>Orders</p>
            <p>{orders?.length}</p>
          </Link>
          <Link to="/admin/allusers">
            <p>Users</p>
            <p>{users?.length}</p>
          </Link>
        </div>
        <div className="lineChart">
          <Line data={lineState} options={optionsLine} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughState} options={optionsDoughnut} />
        </div>
      </div> */}
    </div>
  );
};

export default DashBoard;
