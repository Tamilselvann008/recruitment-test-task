import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// import Login from "./pages/Login";
// import UserList from "./pages/UserList";
// import CreateUser from "./pages/CreateUser";
// import EditUser from "./pages/EditUser";
// import NotFound from "./pages/NotFound";
import PrivateWrapper from "./PrivateWrapper";
import { Login } from "../pages/Login";
import UserList from "../components/pages/UserList";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          element={
            <PrivateWrapper auth={{ isAuthenticated: isAuthenticated }} />
          }
        >
          <Route path="/users" element={<UserList />} />
        </Route>

        <Route path="/" element={<Navigate to="/users" />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};
export default AppRoutes;
