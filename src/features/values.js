import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveTotalSales } from "../requests/requests";

const initialState = {
  values: {
    data: [],
    comparisonTotalSales: [],
    cik: null,
    totalSales: null,
    loading: false,
  },
};

export const totalSalesRequestList = createAsyncThunk(
  "totalSalesRequestList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await retrieveTotalSales(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const totalSalesRequests = createSlice({
  name: "totalSalesRequests",
  initialState,
  reducers: {
    resetTotalSales: (state, action) => {
      state.values.data = [];
    },
    resetComparisonTotalesales: (state, action) => {
      state.values.comparisonTotalSales = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(totalSalesRequestList.pending, (state, action) => {
        state.values.loading = true;
      })
      .addCase(totalSalesRequestList.fulfilled, (state, action) => {
        state.values.data = action.payload;
        state.values.comparisonTotalSales = [
          ...state.values.comparisonTotalSales,
          ...action.payload,
        ];
        state.values.loading = false;
      })
      .addCase(totalSalesRequestList.rejected, (state, action) => {
        state.values.loading = false;
      });
  },
});

export const { resetTotalSales, resetComparisonTotalesales } =
  totalSalesRequests.actions;
export const totalSalesReducer = totalSalesRequests.reducer;
