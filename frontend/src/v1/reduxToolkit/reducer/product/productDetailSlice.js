import { createSlice } from "@reduxjs/toolkit";
import { getProductDetail } from "../../actions/productAction";

const productDetailSlice = createSlice({
    name: "productdetail",
    initialState: {
        isLoading: false,
        error: null,
        product: null
    },
    reducers: {
        clearError: (state) => {state.error = null;},
    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetail.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload.product;
        })
        builder.addCase(getProductDetail.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            
        })
    }
});

export const {clearError} = productDetailSlice.actions;
export default productDetailSlice.reducer;
