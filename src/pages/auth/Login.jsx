import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import Storage from "../../utils/Storage";
import userContext from "../../context/UserContext";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigation = useNavigate();

  const { setUser } = useContext(userContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit button clicked");

    try {
      setIsLoading(true);
      setError("");
      console.log(data);
      const { data: userData } = await AuthService.login(data);
      setUser(userData.user);
      Storage.setString("token", userData.token);
      navigation("/");
    } catch (err) {
      console.error("Error:", err);
      setError(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong">
            <div className="card-body p-5 text-center">
              <form onSubmit={handleSubmit}>
                <h3 className="mb-5">Sign in</h3>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={data.email}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">Password</label>
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit">
                  Login
                </button>
                {error && <div className="alert alert-danger mt-5">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
