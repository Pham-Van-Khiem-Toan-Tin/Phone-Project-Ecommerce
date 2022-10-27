import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const axios = require("axios").default;

//register
export const register = createAsyncThunk(
  "USER_REGITER",
  async (userForm, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/register`,
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
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/login`,
        {email: dataLogin.loginEmail, password: dataLogin.loginPassword},
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
  async  (_, {rejectWithValue}) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v1/admin/users`);
      console.log(data);
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