import { createAsyncThunk } from "@reduxjs/toolkit";

const axios = require("axios").default;

export const addItemToCart = createAsyncThunk(
  "ADD_ITEMCART",
  async (data, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.put(`http://localhost:8000/api/v1/addcart`);
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
