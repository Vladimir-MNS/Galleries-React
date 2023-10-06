import { Link } from "react-router-dom";
import userContext from "../context/UserContext";
import { useContext } from "react";

const Header = () => {
  const { user, logout } = useContext(userContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-md">
        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                All Galeries
              </Link>
            </li>
            {user && <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create Gallery
              </Link>
            </li>}
          </ul>

          <div className="d-flex align-items-center">
            {!user?(<>
            <Link type="button" className="btn btn-link px-3 me-2" to="/login">
              Login
            </Link>
            <Link type="button" className="btn btn-primary me-3" to="/register">
              Register
            </Link>
            </>
            ) : (
                <button className="btn btn-primary me-3" onClick={logout}>
                  Log Out
                </button>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
