import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "../../actions/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: "",
    user: null,
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
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      // console.log(action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;

      // console.log(action.payload);
    });
  },
});
export const {clearError, reload} = userSlice.actions;
export default userSlice.reducer;
