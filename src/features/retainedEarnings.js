import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveRetainedEarnings } from "../requests/requests";

const initialState = {
  values: {
    retainedEarnings: [],
    comparisonRetainedEarnings: [],
    cik: null,
    loading: false,
  },
};

export const retainedEarningsRequestList = createAsyncThunk(
  "retainedEarningsRequestList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await retrieveRetainedEarnings(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const retainedEarningsRequests = createSlice({
  name: "retainedEarningsRequests",
  initialState,
  reducers: {
    resetRetainedEarnings: (state, action) => {
      state.values.retainedEarnings = [];
    },
    resetComparisonRetainedEarnings: (state, action) => {
      state.values.comparisonRetainedEarnings = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retainedEarningsRequestList.pending, (state, action) => {
        state.values.loading = true;
      })
      .addCase(retainedEarningsRequestList.fulfilled, (state, action) => {
        state.values.retainedEarnings = action.payload;
        state.values.comparisonRetainedEarnings = [
          ...state.values.comparisonRetainedEarnings,
          ...action.payload,
        ];
        state.values.loading = false;
      })
      .addCase(retainedEarningsRequestList.rejected, (state, action) => {
        state.values.loading = false;
      });
  },
});

export const { resetRetainedEarnings, resetComparisonRetainedEarnings } =
  retainedEarningsRequests.actions;

export const retainedEarningsReducer = retainedEarningsRequests.reducer;
