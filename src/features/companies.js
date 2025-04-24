import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveCompanies } from "../requests/requests";

const initialState = {
  companies: {
    items: [],
    loading: false,
    pagination: {},
    globalSearchValue: "",
  },
  selectedCompany: null,
  selectedComparisonCompanies: [],
};

export const companiesRequestsList = createAsyncThunk(
  "contractRequestsList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await retrieveCompanies(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const companiesRequests = createSlice({
  name: "contractRequests",
  initialState,
  reducers: {
    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
    setSelectedComparisonCompanies: (state, action) => {
      state.selectedComparisonCompanies.push(action.payload);
    },
    removeSelectedComparisonCompany: (state, action) => {
      state.selectedComparisonCompanies =
        state.selectedComparisonCompanies.filter(
          (company) => company.cik !== action.payload
        );
    },
    setGlobalSearchValue: (state, action) => {
      state.companies.globalSearchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(companiesRequestsList.pending, (state, action) => {
        state.companies.loading = true;
      })
      .addCase(companiesRequestsList.fulfilled, (state, action) => {
        state.companies.items = action.payload.data;
        state.companies.pagination = action.payload.pagination;
        state.companies.loading = false;
      })
      .addCase(companiesRequestsList.rejected, (state, action) => {
        state.companies.loading = false;
      });
  },
});

export const {
  setSelectedCompany,
  setSelectedComparisonCompanies,
  removeSelectedComparisonCompany,
  setGlobalSearchValue,
} = companiesRequests.actions;
export default companiesRequests.reducer;
