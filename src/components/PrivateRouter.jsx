import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import userContext from "../context/UserContext";

const PrivateRouter = () => {
  const { user } = useContext(userContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;