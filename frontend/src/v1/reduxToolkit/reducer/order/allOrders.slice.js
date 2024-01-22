import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "../../actions/order.action";

const allOrdersSlice = createSlice({
    name: "newOrder",
    initialState: {
        isLoading: false,
        error: null,
        orders: [],
        resultPerPage: null,
        filteredOrdersCount: null
    },
    reducers: {
        clearError: (state) => {state.error = null; console.log("chay vao day nua");}
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.orders;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredOrdersCount = action.payload.filteredOrdersCount;
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