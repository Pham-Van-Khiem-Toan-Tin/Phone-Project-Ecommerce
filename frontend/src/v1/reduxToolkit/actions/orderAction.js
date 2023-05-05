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
        `http://localhost:8000/api/v1/order/new`,
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
          `http://localhost:8000/api/v1/orders/me`,
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