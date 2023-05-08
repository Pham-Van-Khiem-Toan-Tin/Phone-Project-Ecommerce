import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct } from "../../actions/productAction";

const productSlice = createSlice({
    name: "producthandle",
    initialState: {
        isLoading: false,
        error: null,
        isDelete: false,
        isUpdate: false,
    },
    reducers: {
        clearErrorHandle: (state) => {state.error = null},
        resetDelete: (state) => {state.isDelete = false},
    },
    extraReducers: (builder) => {
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isDelete = action.payload.success;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        })
    }
});

export const {clearErrorHandle, resetDelete} = productSlice.actions;
export default productSlice.reducer;
