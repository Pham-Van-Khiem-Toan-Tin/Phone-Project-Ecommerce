import { createSlice } from "@reduxjs/toolkit";
import { allUser } from "../../actions/userAction";

const allUserSlice = createSlice({
  name: "allUser",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
    message: null,
    isDelete: false,
    deleteError: null,
  },
  reducers: {
    clearError: (state) => {state.error = null},
   
  },
  extraReducers: (builder) => {
    builder.addCase(allUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
      if(action.payload.accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
      }
    });
    builder.addCase(allUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError } = allUserSlice.actions;
export default allUserSlice.reducer;
