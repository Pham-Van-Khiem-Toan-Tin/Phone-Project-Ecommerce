import { createSlice } from "@reduxjs/toolkit";
import { deleteReview } from "../../actions/productAction";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    isLoading: false,
    error: null,
    isDelete: false,
  },
  reducers: {
    clearErrorAction: (state) => {
      state.error = null;
    },
    reviewReset: (state) => {
      state.isDelete = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDelete = action.payload.success;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrorAction, reviewReset } = reviewSlice.actions;
export default reviewSlice.reducer;
