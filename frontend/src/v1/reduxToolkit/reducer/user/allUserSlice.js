import { createSlice } from "@reduxjs/toolkit";
import { allUser, deleteUser } from "../../actions/userAction";

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
    clearError: (state) => (state.error = null),
    clearDeleteError: (state) => {state.deleteError = null; state.isDelete = false}
  },
  extraReducers: (builder) => {
    builder.addCase(allUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.users = action.payload.users;
    });
    builder.addCase(allUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isDelete = action.payload.success;
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.deleteError = action.payload;
    });
  },
});

export const { clearError, clearDeleteError } = allUserSlice.actions;
export default allUserSlice.reducer;
