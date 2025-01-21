import { Provider } from "react-redux";
import "./App.css";
import CompaniesPage from "./views/CompaniesPage";
import HomePage from "./views/HomePage";
import store from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        {/* <CompaniesPage></CompaniesPage> */}
        <HomePage />
      </Provider>
    </>
  );
}

export default App;
