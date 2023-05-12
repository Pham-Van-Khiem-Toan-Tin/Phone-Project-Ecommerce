import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
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
  const lineState = {
    labels: ["InitialAmount", "Amount Earn"],
    datasets: [
      {
        backgroundColor: "#FF6D60",
        label: "TOTAL AMOUNT",
        data: [0, totalAmount],
        fill: false,
        borderColor: "#fff",
      },
    ],
  };
  const doughState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        label: 'Quanlity:',
        data: [outOfStock, products.length - outOfStock], // Đưa dữ liệu vào đây, ví dụ có 12 và 18 là 2 giá trị
        backgroundColor: [
          '#F45050',
          '#9384D1',
        ],
        borderWidth: [0, 0]
      },
    ],
  };
  const optionsDoughnut = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  };
  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, // kích thước chữ
            family: "Arial", // font chữ
          },
          color: "#fff", // màu chữ
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#fff", // màu của đường kẻ trên trục x
        },
        ticks: {
          font: {
            size: 14, // kích thước chữ trên trục x
            family: "Arial", // font chữ trên trục x
          },
          color: "#fff", // màu của chữ trên trục x
        },
      },
      y: {
        grid: {
          color: "#fff", // màu của đường kẻ trên trục y
        },
        ticks: {
          font: {
            size: 14, // kích thước chữ trên trục y
            family: "Arial", // font chữ trên trục y
          },
          color: "#fff", // màu của chữ trên trục y
        },
        beginAtZero: true,
      },
    },
  };
  useEffect(() => {
    dispatch(allUser());
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard_summary">
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
      </div>
    </div>
  );
};

export default DashBoard;
