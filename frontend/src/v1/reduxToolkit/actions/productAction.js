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
      let link = `${process.env.REACT_APP_SERVER}/products?keyword=${dataProduct.keyword}&page=${dataProduct.currentPage}&price[gte]=${dataProduct.minValue *23000}&price[lte]=${dataProduct.maxValue * 23000}&ratings[gte]=${dataProduct.ratings}`;
      if (dataProduct.category) {
        link = `${process.env.REACT_APP_SERVER}/products?keyword=${dataProduct.keyword}&page=${dataProduct.currentPage}&price[gte]=${dataProduct.minValue *23000}&price[lte]=${dataProduct.maxValue * 23000}&category=${dataProduct.category}&ratings[gte]=${dataProduct.ratings}`;
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
export const addWishList = createAsyncThunk(
  "REQUEST_ADD_WISH",
  async (product_id, { rejectWithValue }) => {
    try {
      let link = `${process.env.REACT_APP_SERVER}/wish/add`;
      const { data } = await axios.post(link, product_id);
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
export const getCompareList = createAsyncThunk(
  "REQUEST_GET_COMPARE",
  async (_, { rejectWithValue }) => {
    try {
      let link = `${process.env.REACT_APP_SERVER}/compare`;
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const { data } = await axios.get(link,config);
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
export const addCompareList = createAsyncThunk(
  "REQUEST_ADD_COMPARE",
  async (product_id, { rejectWithValue }) => {
    try {
      let link = `${process.env.REACT_APP_SERVER}/compare/${product_id}`;
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const { data } = await axios.put(link, null, config);
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
export const deleteCompare = createAsyncThunk(
  "REQUEST_DELETE_COMPARE",
  async (id, { rejectWithValue }) => {
    try {
      let link = `${process.env.REACT_APP_SERVER}/compare/${id}`;
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const { data } = await axios.delete(link,config);
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
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/hotproducts`);
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
        `${process.env.REACT_APP_SERVER}/admin/products`,
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
        `${process.env.REACT_APP_SERVER}/admin/product/new`,
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
      const {data} = await axios.get(`${process.env.REACT_APP_SERVER}/product/${id}`);
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
      const {data} = await axios.put(`${process.env.REACT_APP_SERVER}/review`, newReview, config);
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
export const getAllReviews = createAsyncThunk(
  "ALL_REVIEWS",
  async (id, {rejectWithValue}) => {
    try {
      console.log({id});
      const {data} = await axios.get(`${process.env.REACT_APP_SERVER}/reviews/?id=${id}`);
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
export const deleteReview = createAsyncThunk(
  "DELETE_REVIEW",
  async (reviewDelete, {rejectWithValue}) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      };
      const {data} = await axios.delete(`${process.env.REACT_APP_SERVER}/reviews/?id=${reviewDelete.reviewId}&productId=${reviewDelete.productId}`, config);
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
      const {data} = await axios.put(`${process.env.REACT_APP_SERVER}/admin/product/${dataChange.id}`,dataChange.myForm , config);
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
      const {data} = await axios.delete(`${process.env.REACT_APP_SERVER}/admin/product/${id}`, config);
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
