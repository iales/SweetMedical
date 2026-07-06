import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  const payload = jwtDecode(token);

  if (!allowedRoles.includes(payload.rol)) {
    return <Navigate to="/acceso-denegado" />;
  }

  return children;
};

export default RoleProtectedRoute;