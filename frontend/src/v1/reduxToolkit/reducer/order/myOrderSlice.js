import { createSlice } from "@reduxjs/toolkit";
import { myOrders } from "../../actions/order.action";

const myOrderSlice = createSlice({
  name: "newOrder",
  initialState: {
    isLoading: false,
    error: null,
    orders: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(myOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(myOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(myOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
  },
});

export const { clearError } = myOrderSlice.actions;
export default myOrderSlice.reducer;
