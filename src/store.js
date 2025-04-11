import { configureStore, current } from "@reduxjs/toolkit";
import companiesReducer from "./features/companies"; // Import the default reducer from your slice file
import { totalSalesReducer } from "./features/values"; // Import the default reducer from your slice file
import { operatingIncomeReducer } from "./features/operatingIncome";
import { currentAssetsReducer } from "./features/currentAssets";
import { currentLiabilitiesReducer } from "./features/currentLiabilities";
import { totalAssetsReducer } from "./features/totalAssets";
import { totalEquityReducer } from "./features/totalEquity";
import { retainedEarningsReducer } from "./features/retainedEarnings";

const store = configureStore({
  reducer: {
    companies: companiesReducer, // Register the reducer under the "companies" key
    values: totalSalesReducer,
    operatingIncome: operatingIncomeReducer,
    currentAssets: currentAssetsReducer,
    currentLiabilities: currentLiabilitiesReducer,
    totalAssets: totalAssetsReducer,
    totalEquity: totalEquityReducer,
    retainedEarnings: retainedEarningsReducer,
  },
});

export default store;
