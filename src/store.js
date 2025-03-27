import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./features/companies"; // Import the default reducer from your slice file
import totalSalesReducer from "./features/values"; // Import the default reducer from your slice file

const store = configureStore({
  reducer: {
    companies: companiesReducer, // Register the reducer under the "companies" key
    values: totalSalesReducer,
  },
});

export default store;
