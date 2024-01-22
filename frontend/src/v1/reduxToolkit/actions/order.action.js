import { createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios").default;

export const createOrder = createAsyncThunk(
  "CREATE_ORDER",
  async (order, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/order/new`,
        order,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const myOrders = createAsyncThunk(
  "MY_ORDERS",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/orders/me`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const orderDetail = createAsyncThunk(
  "ORDERS_DETAIL",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/order/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getAllOrders = createAsyncThunk(
  "ALL_ORDERS",
  async (page, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/admin/orders?page=${page}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "DELETE_ORDER",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER}/admin/order/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const updateOrder = createAsyncThunk(
  "UPDATE_ORDER",
  async (order, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}/admin/order/${order.id}`,
        order.myForm,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
