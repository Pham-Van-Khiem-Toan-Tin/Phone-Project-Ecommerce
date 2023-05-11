import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, resetPassword } from "../../actions/userAction";

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    isLoading: false,
    error: null,
    message: null,
    success: null,
  },
  reducers: {
    clearError: (state) => {state.error = null},
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
      });
      builder.addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
