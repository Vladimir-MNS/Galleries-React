import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";
import Storage from "../utils/Storage";

const useUser = () => {
  const [user, setUser] = useState(Storage.get("user") || undefined);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (e) {
      console.log(e);
    } finally {
      setUser(undefined);
      Storage.clear("user");
      Storage.clear("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (user) {
      Storage.set("user", user);
    }
  }, [user]);

  return {
    user,
    setUser,
    logout,
  };
};

export default useUser;
