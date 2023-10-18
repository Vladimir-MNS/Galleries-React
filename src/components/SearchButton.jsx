import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchAllGalleries } from "../store/galleries/slice";

const SearchButton = () => {
  const [searchQuery, setSearchQuery] = useState({
    take: 10,
    skip: 0,
    field: "",
    query: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setSearchQuery((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchAllGalleries(searchQuery));
    navigate("/search");
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong">
            <div className="card-body p-5 text-center">
              <form className="form-inline mr-auto" onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input
                  onChange={handleInputChange}
                  name="query"
                  className="form-control"
                  type="text"
                  placeholder="Type in your search..."
                  required
                />
                </div>
                <div className="form-outline mb-4">
                <select
                  onChange={handleInputChange}
                  name="field"
                  className="form-select form-select-lg mb-3"
                  required>
                  <option>Select Search criteria</option>
                  <option value="Name">Name</option>
                  <option value="Description">Description</option>
                  <option value="Author">Author</option>
                </select>
                </div>
                <div className="form-outline mb-4">
                <button className="btn btn-primary me-3" type="submit">
                  Search
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchButton;
