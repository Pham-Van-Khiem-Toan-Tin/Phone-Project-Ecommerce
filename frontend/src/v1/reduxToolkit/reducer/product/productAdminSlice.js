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
            state.isLoading = false;
            state.success = action.payload.success;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        })
        builder.addCase(newProduct.rejected, (state, action) => {
            state.error = action.payload.error;
            state.isLoading = false;
            if(action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            }
        })
    }
});

export const {clearErrorNewProduct, resetNewProduct} = newProductSlice.actions;
export default newProductSlice.reducer;
