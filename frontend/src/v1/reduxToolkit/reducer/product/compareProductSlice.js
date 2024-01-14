import { createSlice } from "@reduxjs/toolkit";
import { addCompareList, deleteCompare, getCompareList } from "../../actions/productAction";

const compareSlice = createSlice({
  name: "compareSlice",
  initialState: {
    isLoading: false,
    success: false,
    error: null,
    compareList: [],
  },
  reducers: {
    clearErrorCompare: (state) => {
      state.error = null;
    },
    resetToCompare: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCompareList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCompareList.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.isLoading = false;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(addCompareList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteCompare.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCompare.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.isLoading = false;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(deleteCompare.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getCompareList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCompareList.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.compare);
      state.compareList = action.payload.compare.items;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(getCompareList.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrorCompare, resetToCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
