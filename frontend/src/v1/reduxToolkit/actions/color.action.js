import { createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios").default;

export const getAllColor = createAsyncThunk(
  "ALL_COLOR",
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
        `${process.env.REACT_APP_SERVER}/admin/color?page=${page}&key=${
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

export const updateColor = createAsyncThunk(
  "UPDATE_COLOR",
  async (newCategory, { rejectWithValue }) => {
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
        `${process.env.REACT_APP_SERVER}/admin/color`,
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
export const createColor = createAsyncThunk(
    "CREATE_COLOR",
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
          `${process.env.REACT_APP_SERVER}/admin/color`,
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
export const deleteColor = createAsyncThunk(
    "DELETE_COLOR",
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
        const { data } = await axios.delete(
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
