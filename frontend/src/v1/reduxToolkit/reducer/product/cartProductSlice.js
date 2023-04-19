import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart } from "../../actions/cartAction";

const addItemCartSlice = createSlice({
  name: "allproductcategories",
  initialState: {
    isLoading: false,
    success: null,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAddToCart: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.isLoading = false;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError, resetAddToCart } = addItemCartSlice.actions;
export default addItemCartSlice.reducer;
