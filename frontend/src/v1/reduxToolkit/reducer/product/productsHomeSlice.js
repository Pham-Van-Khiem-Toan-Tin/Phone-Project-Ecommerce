import { createSlice } from "@reduxjs/toolkit";
import { getHotProduct, newProduct } from "../../actions/productAction";

const productsHomeSlice = createSlice({
    name: "productshome",
    initialState: {
        isLoading: false,
        error: null,
        ssproducts: [],
        xiaoproducts: [],
        approducts: [],
        opproducts: []
    },
    reducers: {
        clearError: (state) => {state.error = null;},
    },
    extraReducers: (builder) => {
        builder.addCase(getHotProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getHotProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.ssproducts = action.payload.samsungProduct;
            state.xiaoproducts = action.payload.xiaomiProduct;
            state.approducts = action.payload.appleProduct;
            state.opproducts = action.payload.oppoProduct;
        })
        builder.addCase(getHotProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            
        })
    }
});

export const {clearError} = productsHomeSlice.actions;
export default productsHomeSlice.reducer;
