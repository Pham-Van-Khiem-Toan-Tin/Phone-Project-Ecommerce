import { createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios").default;

export const getAllReview = createAsyncThunk(
  "ALL_REVIEW",
  async ({ page, key }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/admin/reviews?page=${page}&key=${
          key ? key : ""
        }`,
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

export const updateReview = createAsyncThunk(
  "UPDATE_REVIEW",
  async (newReview, { rejectWithValue }) => {
    try {
        console.log("call api");
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}/admin/reviews`,
        newReview,
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
export const deleteReview = createAsyncThunk(
    "DELETE_REVIEW",
    async (id, { rejectWithValue }) => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const config = {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        const { data } = await axios.delete(
          `${process.env.REACT_APP_SERVER}/admin/reviews?id=${id}`,
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
