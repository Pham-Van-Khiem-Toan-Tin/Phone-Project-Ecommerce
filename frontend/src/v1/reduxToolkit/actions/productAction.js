import { createAsyncThunk, createAction, current } from "@reduxjs/toolkit";
const axios = require("axios").default;

//get all prooduct
export const getProducts = createAsyncThunk(
  "REQUEST_GETALLPROCDUCTS",
  async (
    dataProduct,
    { rejectWithValue }
  ) => {
    try {
      if(!dataProduct.keyword) {
        dataProduct.keyword = "";
      }
      let link = `/api/v1/products?keyword=${dataProduct.keyword}&page=${dataProduct.currentPage}&price[gte]=${dataProduct.minValue}&price[lte]=${dataProduct.maxValue}&ratings[gte]=${dataProduct.ratings}`;
      if (dataProduct.category) {
        link = `/api/v1/products?keyword=${dataProduct.keyword}&page=${dataProduct.currentPage}&price[gte]=${dataProduct.minValue}&price[lte]=${dataProduct.maxValue}&category=${dataProduct.category}&ratings[gte]=${dataProduct.ratings}`;
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
