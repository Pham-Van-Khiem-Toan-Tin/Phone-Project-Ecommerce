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
        clearErrorNewProduct: (state) => {state.error = null;},
        resetNewProduct: (state) => {state.success = false},
    },
    extraReducers: (builder) => {
        builder.addCase(newProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(newProduct.fulfilled, (state, action) => {
            console.log(action.payload.success);
            state.isLoading = false;
            state.success = action.payload.success;
        })
        builder.addCase(newProduct.rejected, (state, action) => {
            state.error = action.payload.error;
            state.isLoading = false;
        })
    }
});

export const {clearErrorNewProduct, resetNewProduct} = newProductSlice.actions;
export default newProductSlice.reducer;
