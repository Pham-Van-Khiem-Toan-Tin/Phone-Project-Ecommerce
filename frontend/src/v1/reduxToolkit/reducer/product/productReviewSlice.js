import { createSlice } from "@reduxjs/toolkit";
import { newReview } from "../../actions/productAction";

const newProductReviewSlice = createSlice({
  name: "newreview",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearErrorReview: (state) => {
      state.error = null;
    },
    newReviewReset: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(newReview.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.success = action.payload.success;
    });
    builder.addCase(newReview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrorReview, newReviewReset } = newProductReviewSlice.actions;
export default newProductReviewSlice.reducer;
