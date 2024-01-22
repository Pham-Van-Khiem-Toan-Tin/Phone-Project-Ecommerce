import { createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios").default;

export const getAllCategory = createAsyncThunk(
  "ALL_CATEGORY",
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
        `${process.env.REACT_APP_SERVER}/admin/category?page=${page}&key=${
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

export const updateCategory = createAsyncThunk(
  "UPDATE_CATEGORY",
  async (newCategory, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      console.log("call api");
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}/admin/category`,
        newCategory,
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
export const createCategory = createAsyncThunk(
    "CREATE_CATEGORY",
    async (newCategory, { rejectWithValue }) => {
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
          `${process.env.REACT_APP_SERVER}/admin/category`,
          newCategory,
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
