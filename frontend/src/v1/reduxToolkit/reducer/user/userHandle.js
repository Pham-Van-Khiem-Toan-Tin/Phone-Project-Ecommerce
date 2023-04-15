import { createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../../actions/userAction";
const UserHandleSlice = createSlice({
  name: "userHandle",
  initialState: {
    isLoading: false,
    error: null,
    isUpDate: false,
  },
  reducers: {
    clearError: (state) => (state.error = null),
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
  },
});
export const {clearError} = UserHandleSlice.actions;
export default UserHandleSlice.reducer;