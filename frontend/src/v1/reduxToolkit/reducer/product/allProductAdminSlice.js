import { createSlice } from "@reduxjs/toolkit";
import { getAdminProducts } from "../../actions/productAction";

const allProductAdminSlice = createSlice({
    name: "allproductadmin",
    initialState: {
        isLoading: false,
        error: null,
        products: [],
    },
    reducers: {
        clearError: (state) => {state.error = null},
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAdminProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        });
        builder.addCase(getAdminProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        })
    }
});

export const {clearError} = allProductAdminSlice.actions;
export default allProductAdminSlice.reducer;