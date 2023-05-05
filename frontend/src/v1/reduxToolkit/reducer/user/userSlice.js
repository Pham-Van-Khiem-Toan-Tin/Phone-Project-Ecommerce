import { createSlice } from "@reduxjs/toolkit";
import { register, login, getAccount } from "../../actions/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: "",
    user: null,
    isAdmin: false,
    isAuthenticated: false,
  },
  reducers: {
    clearError: (state) => {state.error = null;},
    reload: (state) => {state.isAuthenticated = true;},
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
      localStorage.setItem('roleShop', action.payload.role);
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
      localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
      localStorage.setItem("role", action.payload.role);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      localStorage.removeItem("accessToken");
    });
    builder.addCase(getAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if(action.payload.accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
      }
    });
    builder.addCase(getAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      
    });
  },
});
export const {clearError, reload} = userSlice.actions;
export default userSlice.reducer;
