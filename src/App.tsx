import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRoutes from "./router";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AppRoutes />
    </div>
  );
}

export default App;
