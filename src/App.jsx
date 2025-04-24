import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import CompaniesPage from "./views/CompaniesPage";
import Dashboard from "./views/Dashboard";
import Compare from "./views/Compare";
import store from "./store";
import { theme } from "./theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<CompaniesPage />} />
            <Route
              path="/companies/:company_id/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/companies/:company_1_id/:company_2_id/compare"
              element={<Compare />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
