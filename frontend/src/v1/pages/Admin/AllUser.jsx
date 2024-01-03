import React, { useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { clearError } from "../../reduxToolkit/reducer/user/allUserSlice";
import { format } from "date-fns";
import { allUser, deleteUser } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { provinces } from "./provinces";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import "./all-users.css";
import {
  clearErrorHandle,
  deleteReset,
} from "../../reduxToolkit/reducer/user/userHandle";
const AllUser = ({ChildrenComponent}) => {
  const dispatch = useDispatch();
  const { error, users, isLoading } = useSelector((state) => state.allUsers);
  const {
    isDelete,
    error: errorDelete,

    message,
  } = useSelector((state) => state.handleUser);
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };
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
        label: "New User",
        backgroundColor: "#475be8",
        borderRadius: 2,
        hoverBackgroundColor: "#36429e",
        data: [40,60, 80, 100, 60, 20, 70, 90, 30],
      },
      {
        label: "User visited",
        backgroundColor: "#e3e6fc",
        borderRadius: 2,
        hoverBackgroundColor: "#989aa5",
        data: [60,10,20,60, 80, 100, 60, 20, 70,],
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
        label: 'User visited',
        data: [20,14,36],
        backgroundColor: "#475be8",
        borderColor: "#475be8",
      },
      {
        label: 'User paid',
        data: [12, 8, 15],
        backgroundColor: "#e3e6fc",
        borderColor: "#e3e6fc",
      }
    ]
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (errorDelete) {
      toast.error(errorDelete);
      dispatch(clearErrorHandle());
    }
  }, [dispatch, error, errorDelete]);
  useEffect(() => {
    if (isDelete) {
      toast.success(message);
      dispatch(deleteReset());
    }
    dispatch(allUser());
  }, [dispatch, isDelete]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="all-users">
          <div className="row">
            <div className="col-3"><ChildrenComponent/></div>
            <div className="col-9 p-5" >
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
                <p className="title">New Users</p>
                <p className="total">$100.0K</p>
                <p className="notify">We have sold 123 items</p>
              </div>
              <div className="item-chart col-5">
                <Doughnut data={doughState} options={optionsDoughnut} />
              </div>
            </div>
            <div className="item rounded d-flex align-items-center">
              <div className="item-content col-7">
                <p className="title">User paid</p>
                <p className="total">$100.0K</p>
                <p className="notify">We have sold 123 items</p>
              </div>
              <div className="item-chart col-5">
                <Doughnut data={doughState} options={optionsDoughnut} />
              </div>
            </div>
            <div className="item rounded d-flex align-items-center">
              <div className="item-content col-7">
                <p className="title">Conversion Insights</p>
                <p className="total">$100.0K</p>
                <p className="notify">We have sold 123 items</p>
              </div>
              <div className="item-chart col-5">
                <Doughnut data={doughState} options={optionsDoughnut} />
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
          <div className="last-users p-2 mt-2 rounded">
            <div className="table-responsive">
              <p className="title">New User</p>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => {
                      return (
                        <tr>
                          <th scope="row">{user?._id}</th>
                          <td>{user?.email}</td>
                          <td>{user?.name}</td>
                          <td>{format(new Date(user?.createdAt), "dd/MM/yyyy")}</td>
                          <td>{user?.role}</td>
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
        </div>
      )}
    </>
  );
};

export default AllUser;
