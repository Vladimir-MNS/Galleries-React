import useUser from "../hooks/useUser";
import UserContext from "../context/UserContext";

const UserProvider = ({ children }) => {
  const { user, setUser, logout } = useUser();
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
