import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveTotalEquity } from "../requests/requests";

const initialState = {
  values: {
    totalEquity: [],
    comparisonTotalEquity: [],
    cik: null,
    loading: false,
  },
};

export const totalEquityRequestList = createAsyncThunk(
  "totalEquityRequestList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await retrieveTotalEquity(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const totalEquityRequests = createSlice({
  name: "totalEquityRequests",
  initialState,
  reducers: {
    resetTotalEquity: (state, action) => {
      state.values.totalEquity = [];
    },
    resetComparisonTotalEquity: (state, action) => {
      state.values.comparisonTotalEquity = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(totalEquityRequestList.pending, (state, action) => {
        state.values.loading = true;
      })
      .addCase(totalEquityRequestList.fulfilled, (state, action) => {
        state.values.totalEquity = action.payload;
        state.values.comparisonTotalEquity = [
          ...state.values.comparisonTotalEquity,
          ...action.payload,
        ];
        state.values.loading = false;
      })
      .addCase(totalEquityRequestList.rejected, (state, action) => {
        state.values.loading = false;
      });
  },
});

export const { resetTotalEquity, resetComparisonTotalEquity } =
  totalEquityRequests.actions;

export const totalEquityReducer = totalEquityRequests.reducer;
