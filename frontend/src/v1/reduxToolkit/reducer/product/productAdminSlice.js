import { createSlice } from "@reduxjs/toolkit";
import { newProduct } from "../../actions/productAction";

const newProductSlice = createSlice({
    name: "newproduct",
    initialState: {
        isLoading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearError: (state) => {state.error = null;},
    },
    extraReducers: (builder) => {
        builder.addCase(newProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(newProduct.fulfilled, (state, action) => {
            state.success = action.payload.success;
            state.isLoading = false;
        })
        builder.addCase(newProduct.rejected, (state, action) => {
            state.error = action.payload.error;
            state.isLoading = false;
        })
    }
});

export const {clearError} = newProductSlice.actions;
export default newProductSlice.reducer;