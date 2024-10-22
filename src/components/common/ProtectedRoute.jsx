import { Navigate, Outlet } from "react-router-dom";

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("tokenExpiration");
  return token && expiration && Date.now() < expiration;
};

const ProtectedRoute = () => {
  const tokenIsValid = isTokenValid();

  if (!tokenIsValid) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
