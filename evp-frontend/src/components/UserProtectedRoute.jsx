import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};

export default UserProtectedRoute;
