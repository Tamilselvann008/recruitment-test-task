import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateWrapper from "./PrivateWrapper";
import { Login } from "../pages/Login";
import UserList from "../components/pages/UserList";
import PublicRoute from "./PublicRoute";
import { useAppSelector } from "../hooks/reduxHook";

const AppRoutes = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route
          element={
            <PublicRoute isAuthenticated={!!(isAuthenticated && token)} />
          }
        >
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          element={
            <PrivateWrapper
              auth={{ isAuthenticated: !!(isAuthenticated && token) }}
            />
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
