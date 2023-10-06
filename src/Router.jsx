import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRouter from "./components/PrivateRouter";
import PublicRouter from "./components/PublicRouter";
import AddGallery from "./pages/AddGallery";

const Router = () => {
    return (<Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/" element={<PrivateRouter />} >
        <Route path="/create" element={<AddGallery />} />
      </Route>
      <Route path="/" element={<PublicRouter />} >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Route>
    </Routes>);
}

export default Router;