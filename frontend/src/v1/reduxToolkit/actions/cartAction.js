import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const axios = require("axios").default;

export const addItemToCart = createAsyncThunk(
    "ADD_ITEMCART",
    async (data, {rejectWithValue}) => {
        const {data} = axios.get()
    }
)