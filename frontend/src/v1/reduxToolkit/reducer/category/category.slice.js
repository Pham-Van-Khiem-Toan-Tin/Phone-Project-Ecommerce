import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getAllCategory, updateCategory } from "../../actions/category.action";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    resultPerPage: null,
    filteredCategoryCount: null,
    isLoading: false,
    error: null,
    message: null,
    success: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    reset: (state) => {
        state.success = null;
        state.message = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.categories = action.payload.allCategory;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredCategoryCount = action.payload.filteredCategoryCount;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        if (action.payload.accessToken) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(action.payload.accessToken)
          );
        }
      });
      builder.addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, reset } = categorySlice.actions;
export default categorySlice.reducer;
