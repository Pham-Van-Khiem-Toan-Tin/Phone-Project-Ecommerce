import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const axios = require("axios").default;

//register
export const register = createAsyncThunk(
  "USER_REGITER",
  async (userForm, { rejectWithValue }) => {
    try {
        console.log(userForm);
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
