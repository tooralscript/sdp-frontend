import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveCurrentAssets } from "../requests/requests";

const initialState = {
  values: {
    currentAssets: [],
    cik: null,
    loading: false,
  },
};

export const currentAssetsRequestList = createAsyncThunk(
  "currentAssetsRequestList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await retrieveCurrentAssets(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const currentAssetsRequests = createSlice({
  name: "currentAssetsRequests",
  initialState,
  reducers: {
    resetCurrentAssets: (state, action) => {
      state.values.currentAssets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentAssetsRequestList.pending, (state, action) => {
        state.values.loading = true;
      })
      .addCase(currentAssetsRequestList.fulfilled, (state, action) => {
        state.values.currentAssets = action.payload;

        state.values.loading = false;
      })
      .addCase(currentAssetsRequestList.rejected, (state, action) => {
        state.values.loading = false;
      });
  },
});

export const { resetCurrentAssets } = currentAssetsRequests.actions;

export const currentAssetsReducer = currentAssetsRequests.reducer;
