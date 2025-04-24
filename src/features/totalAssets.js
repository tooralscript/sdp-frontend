import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveTotalAssets } from "../requests/requests";

const initialState = {
  values: {
    totalAssets: [],
    comparisonTotalAssets: [],
    cik: null,
    loading: false,
  },
};

export const totalAssetsRequestList = createAsyncThunk(
  "totalAssetsRequestList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await retrieveTotalAssets(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const totalAssetsRequests = createSlice({
  name: "totalAssetsRequests",
  initialState,
  reducers: {
    resetTotalAssets: (state, action) => {
      state.values.totalAssets = [];
    },
    resetComparisonTotalAssets: (state, action) => {
      state.values.comparisonTotalAssets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(totalAssetsRequestList.pending, (state, action) => {
        state.values.loading = true;
      })
      .addCase(totalAssetsRequestList.fulfilled, (state, action) => {
        state.values.totalAssets = action.payload;
        state.values.comparisonTotalAssets = [
          ...state.values.comparisonTotalAssets,
          ...action.payload,
        ];
        state.values.loading = false;
      })
      .addCase(totalAssetsRequestList.rejected, (state, action) => {
        state.values.loading = false;
      });
  },
});

export const { resetTotalAssets, resetComparisonTotalAssets } =
  totalAssetsRequests.actions;

export const totalAssetsReducer = totalAssetsRequests.reducer;
