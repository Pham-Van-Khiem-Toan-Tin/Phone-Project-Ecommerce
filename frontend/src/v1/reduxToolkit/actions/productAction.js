import { createAsyncThunk, createAction, current } from "@reduxjs/toolkit";
const axios = require("axios").default;

//get all prooduct
export const getProducts = createAsyncThunk(
  "REQUEST_GETALLPROCDUCTS",
  async (
    {
      keyword = "",
      currentPage = 1,
      price = [0, 100000],
      category,
      ratings = 0,
    },
    { rejectWithValue }
  ) => {
    try {
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);
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

//get all product for admin
export const getAdminProducts = createAsyncThunk(
  "ADMIN_GETALLPRODUCTS",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          "Authorization": "Bearer " + token,
        },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/admin/products`,config
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

export const newProduct = createAsyncThunk(
  "CREATE_PRODUCT",
  async (productData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/admin/product/new`,
        productData,
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
