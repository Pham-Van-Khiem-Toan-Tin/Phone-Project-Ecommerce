import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

export const couterSlice = createSlice({
    name: "couter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
});

export const {increment, decrement, incrementByAmount} = couterSlice.actions;

export default couterSlice.reducer;