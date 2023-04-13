import { createSlice } from "@reduxjs/toolkit";
import { newProduct, getAdminProducts } from "../../actions/productAction";
const allProduct = createSlice({
    name: "allproductadmin",
    initialState: {
        isLoading: false,
        error: null,
        product: [],
    },
    reducers: {
        clearErrorAllProduct: (state) => {state.error = null},
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAdminProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
        });
        builder.addCase(getAdminProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
    
})
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
            state.success = action.payload.success;
            state.isLoading = false;
        })
        builder.addCase(newProduct.rejected, (state, action) => {
            state.error = action.payload.error;
            state.isLoading = false;
        })
    }
});

export const {clearErrorNewProduct, resetNewProduct} = newProductSlice.actions;
export default newProductSlice.reducer;