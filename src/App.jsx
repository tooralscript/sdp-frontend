import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import CompaniesPage from "./views/CompaniesPage";
import HomePage from "./views/HomePage";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/companies" element={<CompaniesPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
