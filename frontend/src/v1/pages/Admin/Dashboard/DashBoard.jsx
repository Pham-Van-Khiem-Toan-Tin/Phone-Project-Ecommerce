import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format, subMonths, subDays, eachHourOfInterval } from "date-fns";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { allUser } from "../../../reduxToolkit/actions/userAction";
import { getAdminProducts } from "../../../reduxToolkit/actions/productAction";
import DatePicker from "react-multi-date-picker";
import "./dashboard.css";

import {
  FaArrowUp,
  FaCalendarAlt,
  FaCaretUp,
  FaShoppingBag,
} from "react-icons/fa";
import SalesChart from "./SalesChart";
import SellerChart from "./SellerChart";
import RecentOrders from "./RecentOrders";
import ReactLeaflet from "./ReactLeaflet";

const DashBoard = ({ SideBarComponent, HeaderComponent }) => {
  console.log("re render");
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const { products } = useSelector((state) => state.allProductAdmin);
  const today = new Date();
  const preToday = subDays(today, 1);
  const [dateRange, setDateRange] = useState([preToday, today]);
  const [formatCompare, setFormatCompare] = useState("dd MMM");
  const [labels, setLabels] = useState(() => {
    let labels = [];
    const hoursInDay = eachHourOfInterval({
      start: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0
      ),
      end: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59
      ),
    });
    labels = hoursInDay.map((hour) => format(hour, "HH:mm"));
    return labels;
  });

  const handlePickUpTime = useCallback((e) => {
    setLabels(e.target.value);
    let labels = [];
    switch (e.target.value) {
      case "day":
        // Tạo mảng các giờ trong ngày
        const hoursInDay = eachHourOfInterval({
          start: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            0,
            0
          ),
          end: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            23,
            59
          ),
        });
        // Format mỗi giờ thành chuỗi và sắp xếp theo thứ tự
        labels = hoursInDay.map((hour) => format(hour, "HH:mm"));
        setLabels([...labels]);
        setDateRange([preToday, today])
        setFormatCompare("dd MMM")
        break;
      case "week":
        for (let i = 1; i <= 7; i++) {
          const previousDay = subDays(today, i);
          const formattedDate = format(previousDay, "dd-MM-yyyy");
          labels.push(formattedDate);
        }
        setLabels([...labels]);
        setDateRange([subDays(today, 7), today])
        setFormatCompare("dd MMM")
        break;
      case "month":
        for (let i = 1; i <= 12; i++) {
          const previousMonth = subMonths(today, i);
          const formattedMonth = format(previousMonth, "MM-yyyy");
          labels.push(formattedMonth);
        }
        setLabels([...labels]);
        setDateRange([subMonths(today, 1), today])
        setFormatCompare("MMM yyyy")
        break;
    }
  }, []);

  let outOfStock = 0;
  products?.forEach((item) => {
    if (item.stock === 0) {
      outOfStock++;
    }
  });
  useEffect(() => {
    dispatch(allUser());
    dispatch(getAdminProducts());
  }, [dispatch]);

  return (
    <>
      <SideBarComponent />
      <HeaderComponent />
      <div className="dashboard">
        <p className="title">Dashboard</p>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <span className="fw-bold">Home</span>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
          <div className="time-line">
            <FaCalendarAlt />
            <DatePicker
              value={dateRange}
              range
              format="MMM, DD YYYY"
              rangeHover
              disabled
              dateSeparator=" - "
              maxDate={new Date()}
              minDate={subMonths(today, 1)}
            />
          </div>
        </div>
        <div className="card-group mb-2">
          <div className="card-sale rounded">
            <p className="title">Total Orders</p>
            <div className="d-flex align-items-center justify-content-between content">
              <FaShoppingBag />
              <span className="total">126.500$</span>
              <span className="percent">
                <FaArrowUp /> 34.75%
              </span>
            </div>
            <div className="text-end compare">
              Compare to {format(dateRange[0], formatCompare)}
            </div>
          </div>
          <div className="card-sale rounded">
            <p className="title">Active Orders</p>
            <div className="d-flex align-items-center justify-content-between content">
              <FaShoppingBag />
              <span className="total">126.500$</span>
              <span className="percent">
                <FaArrowUp /> 34.75%
              </span>
            </div>
            <div className="text-end compare">
              Compare to {format(dateRange[0], formatCompare)}
            </div>
          </div>
          <div className="card-sale rounded">
            <p className="title">Completed Orders</p>
            <div className="d-flex align-items-center justify-content-between content">
              <FaShoppingBag />
              <span className="total">126.500$</span>
              <span className="percent">
                <FaArrowUp /> 34.75%
              </span>
            </div>
            <div className="text-end compare">
              Compare to {format(dateRange[0], formatCompare)}
            </div>
          </div>
          <div className="card-sale rounded">
            <p className="title">Return Orders</p>
            <div className="d-flex align-items-center justify-content-between content">
              <FaShoppingBag />
              <span className="total">126.500$</span>
              <span className="percent">
                <FaArrowUp /> 34.75%
              </span>
            </div>
            <div className="text-end compare">
              Compare to {format(dateRange[0], formatCompare)}
            </div>
          </div>
        </div>
        <div className="sale-chart rounded p-2 mb-2">
          <div className="time-pickup d-flex align-items-center justify-content-between">
            <span className="title">Sale Graph</span>

            <select
              onChange={handlePickUpTime}
              className="form-select"
              defaultValue="day"
            >
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>
          <div className="sales">
            <SalesChart labels={labels} />
          </div>
          <span className="title">Revenue Graph</span>
          <div className="revenue">
            <SalesChart labels={labels} />
          </div>
        </div>
        <div className="best-seller-chart rounded p-2 mb-2">
          <p className="title"> Best Seller</p>
          <SellerChart labels={labels} />
        </div>
        <div className="recent-orders rounded">
          <p className="title">Recent Orders</p>
          <RecentOrders />
        </div>
        <ReactLeaflet />
      </div>
    </>
  );
};

export default DashBoard;
