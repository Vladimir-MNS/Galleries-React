import { Route,Routes } from "react-router-dom";
import AllGaleries from "./pages/AllGaleries";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRouter from "./components/PrivateRouter";

const Router = () => {
    return (<Routes>
        <Route index path="/" element={<AllGaleries />} />
        <Route path="/" element={<PrivateRouter />} >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Route>
    </Routes>);
}

export default Router;