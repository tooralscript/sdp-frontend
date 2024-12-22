import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./features/companies"; // Import the default reducer from your slice file

const store = configureStore({
  reducer: {
    companies: companiesReducer, // Register the reducer under the "companies" key
  },
});

export default store;
