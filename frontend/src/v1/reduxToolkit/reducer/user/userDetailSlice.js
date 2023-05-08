import { createSlice } from "@reduxjs/toolkit";
import { getUserDetail, updateUser } from "../../actions/userAction";
const UserDetailSlice = createSlice({
  name: "userDetails",
  initialState: {
    isLoading: false,
    user: null,
    error: null,
  },
  reducers: {
    clearError: (state) => (state.error = null),
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(getUserDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError } = UserDetailSlice.actions;
export default UserDetailSlice.reducer;
