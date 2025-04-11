import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveTotalSales } from "../requests/requests";

const initialState = {
  values: {
    data: [],
    cik: null,
    totalSales: null,
    loading: false,
  },
  // selectedCompany: null,
};

export const totalSalesRequestList = createAsyncThunk(
  "totalSalesRequestList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await retrieveTotalSales(data);
      // console.log("Response data:", response);
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
      state.values.totalSales = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(totalSalesRequestList.pending, (state, action) => {
        state.values.loading = true;
      })
      .addCase(totalSalesRequestList.fulfilled, (state, action) => {
        state.values.data = action.payload;
        state.values.loading = false;
      })
      .addCase(totalSalesRequestList.rejected, (state, action) => {
        state.values.loading = false;
      });
  },
});

export const { resetTotalSales } = totalSalesRequests.actions;
export const totalSalesReducer = totalSalesRequests.reducer;
