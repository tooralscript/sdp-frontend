import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveCurrentLiabilities } from "../requests/requests";

const initialState = {
  values: {
    currentLiabilities: [],
    comparisonCurrentLiabilities: [],
    cik: null,
    loading: false,
  },
};

export const currentLiabilitiesRequestsList = createAsyncThunk(
  "currentLiabilitiesRequestsList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await retrieveCurrentLiabilities(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const currentLiabilitiesRequests = createSlice({
  name: "currentLiabilitiesRequests",
  initialState,
  reducers: {
    resetCurrentLiabilities: (state, action) => {
      state.values.currentLiabilities = [];
    },
    resetComparisonCurrentLiabilities: (state, action) => {
      state.values.comparisonCurrentLiabilities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentLiabilitiesRequestsList.pending, (state, action) => {
        state.values.loading = true;
      })
      .addCase(currentLiabilitiesRequestsList.fulfilled, (state, action) => {
        state.values.currentLiabilities = action.payload;
        state.values.comparisonCurrentLiabilities = [
          ...state.values.comparisonCurrentLiabilities,
          ...action.payload,
        ];
        state.values.loading = false;
      })
      .addCase(currentLiabilitiesRequestsList.rejected, (state, action) => {
        state.values.loading = false;
      });
  },
});

export const { resetCurrentLiabilities, resetComparisonCurrentLiabilities } =
  currentLiabilitiesRequests.actions;

export const currentLiabilitiesReducer = currentLiabilitiesRequests.reducer;
