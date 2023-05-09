import { createSlice } from "@reduxjs/toolkit";
import { register, login, getAccount, logout } from "../../actions/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: "",
    user: null,
    isAdmin: false,
    isAuthenticated: false,
    success: false,
    errorLogout: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.errorLogout = null;
    },
    reload: (state) => {
      state.isAuthenticated = true;
    },
    logoutReset: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      );
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      localStorage.removeItem("accessToken");
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      );
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      localStorage.removeItem("accessToken");
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.success = action.payload.success;
      state.user = null;
      localStorage.removeItem("accessToken");
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.errorLogout = action.payload;
    });
    builder.addCase(getAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(getAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export const { clearError, reload, logoutReset } = userSlice.actions;
export default userSlice.reducer;
