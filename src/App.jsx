import { Provider } from "react-redux";
import "./App.css";
import CompaniesPage from "./views/CompaniesPage";
import store from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <CompaniesPage></CompaniesPage>
      </Provider>
    </>
  );
}

export default App;
