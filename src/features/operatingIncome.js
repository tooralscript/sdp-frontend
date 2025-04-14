import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveOperatingIncome } from "../requests/requests";

const initialState = {
  values: {
    operatingIncome: [],
    cik: null,
    loading: false,
  },
};

export const operatingIncomeRequestList = createAsyncThunk(
  "operatingIncomeRequestList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await retrieveOperatingIncome(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const operatingIncomeRequests = createSlice({
  name: "operatingIncomeRequests",
  initialState,
  reducers: {
    resetOperatingIncome: (state, action) => {
      state.values.operatingIncome = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(operatingIncomeRequestList.pending, (state, action) => {
        state.values.loading = true;
      })
      .addCase(operatingIncomeRequestList.fulfilled, (state, action) => {
        state.values.operatingIncome = action.payload;

        state.values.loading = false;
      })
      .addCase(operatingIncomeRequestList.rejected, (state, action) => {
        state.values.loading = false;
      });
  },
});

export const { resetOperatingIncome } = operatingIncomeRequests.actions;

export const operatingIncomeReducer = operatingIncomeRequests.reducer;
