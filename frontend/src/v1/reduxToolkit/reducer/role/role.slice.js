import { createSlice } from "@reduxjs/toolkit";
import {getRoleList} from "../../actions/role.actions";

const roleSlice = createSlice({
    name: "roles",
    initialState: {
        roles: [],
        isLoading: false,
        error: null,
        message: null,
    },
    reducers: {
        clearError: (state) => {state.error = null}
    },
    extraReducers: (builder) => {
        builder.addCase(getRoleList.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(getRoleList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.roles = action.payload.roleList;
            console.log(action.payload);
            if(action.payload.accessToken) {
              localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
          });
          builder.addCase(getRoleList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          });
    }
});

export const {clearError} = roleSlice.actions;
export default roleSlice.reducer;
