import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "../actions/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: "",
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
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
        state.user = action.payload;
        console.log(action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(action.payload);

    })
  },
});

export default userSlice.reducer;
