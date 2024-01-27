import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getAllCategory, updateCategory } from "../../actions/category.action";
import { createColor, getAllColor, updateColor } from "../../actions/color.action";

const colorSlice = createSlice({
  name: "category",
  initialState: {
    colors: [],
    resultPerPage: null,
    filteredColorCount: null,
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
    builder.addCase(getAllColor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllColor.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.colors = action.payload.allColors;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredColorCount = action.payload.filteredColorCount;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(getAllColor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createColor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createColor.fulfilled, (state, action) => {
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
    builder.addCase(createColor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(updateColor.fulfilled, (state, action) => {
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
      builder.addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, reset } = colorSlice.actions;
export default colorSlice.reducer;
