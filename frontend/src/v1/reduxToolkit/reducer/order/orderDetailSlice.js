import { createSlice } from "@reduxjs/toolkit";
import { orderDetail } from "../../actions/order.action";

const orderDetailSlice = createSlice({
    name: "orderDetail",
    initialState: {
        isLoading: false,
        error: null,
        order: {},
    },
    reducers: {
        clearError: (state) => {state.error = null}
    },
    extraReducers: (builder) => {
        builder.addCase(orderDetail.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(orderDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = action.payload.order;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        });
        builder.addCase(orderDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        })
    }
});

export const {clearError} = orderDetailSlice.actions;
export default orderDetailSlice.reducer;