import { createSlice } from "@reduxjs/toolkit";
import { addItemToWish, deleteItemWish, getProductWish } from "../../actions/wish.action";

const addItemWishSlice = createSlice({
  name: "wish",
  initialState: {
    isLoading: false,
    success: null,
    error: null,
    wishList: null,
  },
  reducers: {
    clearErrorWish: (state) => {
      state.error = null;
    },
    resetToWish: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToWish.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addItemToWish.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.isLoading = false;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(addItemToWish.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductWish.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductWish.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishList = action.payload.wish;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(getProductWish.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteItemWish.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteItemWish.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.isLoading = false;
      if(action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(deleteItemWish.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrorWish, resetToWish } = addItemWishSlice.actions;
export default addItemWishSlice.reducer;
