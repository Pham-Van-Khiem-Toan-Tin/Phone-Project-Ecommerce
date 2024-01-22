import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../../actions/order.action";

const newOrderSlice = createSlice({
    name: "newOrder",
    initialState: {
        isLoading: false,
        error: null,
        order: null,
    },
    reducers: {
        clearError: (state) => {state.error = null}
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = action.payload;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        })
    }
});

export const {clearError} = newOrderSlice.actions;
export default newOrderSlice.reducer;