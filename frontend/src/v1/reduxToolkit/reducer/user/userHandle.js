import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, updateUser } from "../../actions/userAction";
const UserHandleSlice = createSlice({
  name: "userHandle",
  initialState: {
    isLoading: false,
    error: null,
    isUpDate: false,
    isDelete: false,
    message: null,
  },
  reducers: {
    clearErrorHandle: (state) => (state.error = null),
    updateReset: (state) => {state.isUpDate = false},
    deleteReset: (state) => {state.isDelete = false}
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {
        state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpDate = true;
        if(action.payload.accessToken) {
          localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
        }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
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
      if(action.payload.accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
      }
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      if(action.payload.accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
      }
    });
  },
});
export const {clearErrorHandle, updateReset, deleteReset} = UserHandleSlice.actions;
export default UserHandleSlice.reducer;