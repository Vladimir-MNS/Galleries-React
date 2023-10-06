import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import userContext from "../context/UserContext";

const PublicRouter = () => {
  const { user } = useContext(userContext);

  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRouter;