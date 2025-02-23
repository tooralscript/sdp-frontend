import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "./App.css";
import CompaniesPage from "./views/CompaniesPage";
import Dashboard from "./views/Dashboard";
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
              path="/companies/:companyId/dashboard"
              element={<Dashboard />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
