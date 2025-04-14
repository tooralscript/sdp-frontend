import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveRetainedEarnings } from "../requests/requests";

const initialState = {
  values: {
    retainedEarnings: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(retainedEarningsRequestList.pending, (state, action) => {
        state.values.loading = true;
      })
      .addCase(retainedEarningsRequestList.fulfilled, (state, action) => {
        state.values.retainedEarnings = action.payload;
        state.values.loading = false;
      })
      .addCase(retainedEarningsRequestList.rejected, (state, action) => {
        state.values.loading = false;
      });
  },
});

export const { resetRetainedEarnings } = retainedEarningsRequests.actions;

export const retainedEarningsReducer = retainedEarningsRequests.reducer;
