import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveTotalSales } from "../requests/requests";

const initialState = {
  values: {
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
      console.log("Response data:", response);
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
        console.log("pending");
        state.values.loading = true;
      })
      .addCase(totalSalesRequestList.fulfilled, (state, action) => {
        console.log("Fulfilled payload:", action.payload);
        state.values.cik = action.payload.cik;
        state.values.totalSales = action.payload.value;
        state.values.loading = false;
      })
      .addCase(totalSalesRequestList.rejected, (state, action) => {
        state.values.loading = false;
      });
  },
});

export const { resetTotalSales } = totalSalesRequests.actions;
export default totalSalesRequests.reducer;
