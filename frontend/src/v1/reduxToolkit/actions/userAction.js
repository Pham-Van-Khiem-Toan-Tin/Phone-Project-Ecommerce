import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const axios = require("axios").default;

//register
export const register = createAsyncThunk(
  "USER_REGITER",
  async (userForm, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/register`,
        userForm,
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
export const login = createAsyncThunk(
  "USER_LOGIN",
  async (dataLogin, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/login`,
        { email: dataLogin.loginEmail, password: dataLogin.loginPassword },
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
export const logout = createAsyncThunk(
  "USER_LOGOUT",
  async (_, { rejectWithValue }) => {
    try {
      const config = { withCredentials: true };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/logout`,
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

export const allUser = createAsyncThunk(
  "ALL_USER",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: { Authorization: "Bearer " + token },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/admin/users`,
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
export const deleteUser = createAsyncThunk(
  "DELETE_USER",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: { Authorization: "Bearer " + token },
        withCredentials: true,
      };
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER}/admin/user/${id}`,
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
export const getUserDetail = createAsyncThunk(
  "GET_USER_DETAIL",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: { Authorization: "Bearer " + token },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/admin/user/${id}`,
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

export const updateUser = createAsyncThunk(
  "UPDATE_USER",
  async (dataUpdate, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}/admin/user/${dataUpdate.id}`,
        dataUpdate.myForm,
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

export const updateProfile = createAsyncThunk(
  "UPDATE_PROFILE",
  async (dataUpdate, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}/me/update`,
        dataUpdate,
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

export const updatePassword = createAsyncThunk(
  "UPDATE_PASSWORD",
  async (dataUpdate, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}/password/update`,
        dataUpdate,
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
export const forgotPassword = createAsyncThunk(
  "FORGOT_PASSWORD",
  async (dataUpdate, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/password/forgot`,
        dataUpdate,
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
export const resetPassword = createAsyncThunk(
  "RESET_PASSWORD",
  async (dataReset, { rejectWithValue }) => {
    try {
      console.log(dataReset);
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };
      console.log("chay den day");
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}/password/reset/${dataReset.token}`,
        dataReset.myForm,
        config
      );
      console.log("call");
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

export const getAccount = createAsyncThunk(
  "USER_DETAIL",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: { Authorization: "Bearer " + token },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/me`,
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
