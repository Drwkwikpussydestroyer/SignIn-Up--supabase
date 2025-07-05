import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { session } = UserAuth();

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;
