import { createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../../actions/userAction";
const UserHandleSlice = createSlice({
  name: "userHandle",
  initialState: {
    isLoadingHandle: false,
    errorHandle: null,
    isUpDate: false,
  },
  reducers: {
    clearErrorHandle: (state) => (state.error = null),
    updateReset: (state) => {state.isUpDate = false}
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {
        state.isLoadingHandle = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
        state.isLoadingHandle = false;
        state.isUpDate = true;
        if(action.payload.accessToken) {
          localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
        }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
        state.isLoadingHandle = false;
        state.errorHandle = action.payload;
    });
  },
});
export const {clearErrorHandle, updateReset} = UserHandleSlice.actions;
export default UserHandleSlice.reducer;