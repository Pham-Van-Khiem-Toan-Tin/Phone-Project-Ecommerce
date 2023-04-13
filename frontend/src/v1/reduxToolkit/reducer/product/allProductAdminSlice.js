import { createSlice } from "@reduxjs/toolkit";
import { getAdminProducts } from "../../actions/productAction";

const allProductAdminSlice = createSlice({
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
            state.product = action.payload.products;
        });
        builder.addCase(getAdminProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
});

export const {clearErrorAllProduct} = allProductAdminSlice.actions;
export default allProductAdminSlice.reducer;