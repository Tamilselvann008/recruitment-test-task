import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRoutes from "./router";
import { Provider } from "react-redux";
import store from "./redux";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  );
}

export default App;
