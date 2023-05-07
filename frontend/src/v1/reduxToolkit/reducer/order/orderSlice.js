import { createSlice } from "@reduxjs/toolkit";
import { deleteOrder } from "../../actions/orderAction";

const orderSlice = createSlice({
    name: "orderhandle",
    initialState: {
        isLoading: false,
        error: null,
        isDelete: false,
        isUpdate: false,
    },
    reducers: {
        clearErrorOrder: (state) => {state.error = null},
        deleteReset: (state) => {state.isDelete = false}
    },
    extraReducers: (builder) => {
        builder.addCase(deleteOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isDelete = action.payload.success;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        });
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        })
    }
});

export const {clearErrorOrder, deleteReset} = orderSlice.actions;
export default orderSlice.reducer;