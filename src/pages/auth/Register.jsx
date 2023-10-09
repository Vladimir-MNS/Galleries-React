import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import Storage from "../../utils/Storage";
import userContext from "../../context/UserContext";

const Register = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  const navigation = useNavigate();

  const { setUser } = useContext(userContext);

  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit button clicked');

    try {
      setIsLoading(true);
      setError("");
      console.log(data);
      const { data: userData } = await AuthService.register(data);
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
    <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div className="row gx-lg-5 align-items-center mb-5">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h1 className="my-5 display-5 fw-bold ls-tight">
            Please <br />
            <span>Register</span>
          </h1>
          <p className="mb-4 opacity-70">Welcome to the best app around</p>
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"></div>

          <div className="card bg-glass">
            <div className="card-body px-4 py-5 px-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      value={data.first_name}
                      onChange={handleInputChange}
                    />
                    <label className="form-label">
                      First Name
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="last_name"
                      className="form-control"
                      value={data.last_name}
                      onChange={handleInputChange}
                    />
                    <label className="form-label">
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={data.email}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">
                    Password
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    name="password_confirmation"
                    className="form-control"
                    value={data.password_confirmation}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">
                    Confirm Password
                  </label>
                </div>

                <div class="form-check d-flex justify-content-center mb-5">
                    <input required class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in Terms of service
                    </label>
                  </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  disabled={isLoading}>
                  Sign up
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

export default Register;
