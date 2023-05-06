import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "../../actions/orderAction";

const allOrdersSlice = createSlice({
    name: "newOrder",
    initialState: {
        isLoading: false,
        error: null,
        orders: [],
    },
    reducers: {
        clearError: (state) => {state.error = null}
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.orders;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        });
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        })
    }
});

export const {clearError} = allOrdersSlice.actions;
export default allOrdersSlice.reducer;