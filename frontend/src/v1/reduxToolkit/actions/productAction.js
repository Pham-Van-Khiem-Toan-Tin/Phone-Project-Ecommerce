import { createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios").default;

//get all prooduct
export const getAllProducts = createAsyncThunk(
  "REQUEST_GETALLPROCDUCTS",
  async (dataProduct, { rejectWithValue }) => {
    try {
      if (!dataProduct.keyword) {
        dataProduct.keyword = "";
      }
      let link = `http://localhost:8000/api/v1/products?keyword=${dataProduct.keyword}&page=${dataProduct.currentPage}&price[gte]=${dataProduct.minValue}&price[lte]=${dataProduct.maxValue}&ratings[gte]=${dataProduct.ratings}`;
      if (dataProduct.category) {
        link = `http://localhost:8000/api/v1/products?keyword=${dataProduct.keyword}&page=${dataProduct.currentPage}&price[gte]=${dataProduct.minValue}&price[lte]=${dataProduct.maxValue}&category=${dataProduct.category}&ratings[gte]=${dataProduct.ratings}`;
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

export const getHotProduct = createAsyncThunk(
  "REQUEST_GETHOTPRODUCTS",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/hotproducts");
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
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/admin/products`,
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

export const newProduct = createAsyncThunk(
  "CREATE_PRODUCT",
  async (productData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
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

export const getProductDetail = createAsyncThunk(
  "PRODUCT_DETAIL",
  async (id, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(`http://localhost:8000/api/v1/product/${id}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export const newReview = createAsyncThunk(
  "NEW_REVIEW",
  async (newReview, {rejectWithValue}) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const {data} = await axios.put(`http://localhost:8000/api/v1/review`, newReview, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)
export const updateProduct = createAsyncThunk(
  "UPDATE_PRODUCT",
  async (dataChange, {rejectWithValue}) => {
    try {
      console.log(dataChange);
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const {data} = await axios.put(`http://localhost:8000/api/v1/admin/product/${dataChange.id}`,dataChange.myForm , config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "DELETE_PRODUCT",
  async (id, {rejectWithValue}) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const {data} = await axios.delete(`http://localhost:8000/api/v1/admin/product/${id}`, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)
