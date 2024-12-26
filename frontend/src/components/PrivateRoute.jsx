import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = useState(!!user); // Convertir a booleano

  // Vigilar cambios en el usuario autenticado
  useEffect(() => {
    setAuthenticated(!!user);
  }, [user, children]);

  if (authenticated) return children;

  return <Navigate to="/login" />;
};

export default PrivateRoute;
