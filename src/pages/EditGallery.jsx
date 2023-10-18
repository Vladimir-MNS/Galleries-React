import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Galleries from "../services/galleries.service";
import userContext from "../context/UserContext";

const EditGallery = () => {
  const { user } = useContext(userContext);
  const { id } = useParams();

  const [newGallery, setNewGallery] = useState({
    name: "",
    description: "",
    images: [],
    user_id: user.id,
  });

  const [urlInputs, setUrlInputs] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { data } = await Galleries.get(id);

        if (isMounted) {
          setNewGallery(data);
          setUrlInputs(newGallery.images)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const [validationErrors, setValidationErrors] = useState("");


  const navigate = useNavigate();

  const addImageField = () => {
    setUrlInputs((prevFields) => [...prevFields, prevFields.length]);
  };

  const handleInputChange = (e, index) => {
    const { name, value, type } = e.target;

    const updatedImages = [...newGallery.images];

    updatedImages[index] = value;

    if (type === "url") {
      setNewGallery((prevValue) => ({
        ...prevValue,
        images: updatedImages,
      }));
    } else {
      setNewGallery((prevValue) => ({ ...prevValue, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name: newGallery.name,
      description: newGallery.description,
      images: newGallery.images,
    };

    try {
      const response = await Galleries.update(updatedData, parseInt(id));
      navigate(`/galleries/${id}`);
    } catch (error) {
      setValidationErrors(error.response?.data?.message);
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong">
            <div className="card-body p-5 text-center">
              <form onSubmit={handleSubmit}>
                <h3 className="mb-5">Update your gallery</h3>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    value={newGallery.name}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">Gallery Name</label>
                </div>

                <div className="form-outline mb-4">
                  <textarea
                    name="description"
                    className="form-control form-control-lg"
                    value={newGallery.description}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">Gallery Description</label>
                </div>
                {urlInputs.map((urlInput, index) => (
                  <div key={index}className="form-outline mb-4">
                    <input
                      type="url"
                      name={`image ${index + 1}`}
                      className="form-control form-control-lg"
                      value={newGallery.images[index]}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                    <label style={{ marginRight:"5px" }} className="form-label">Image URL</label>
                    {index !== 0 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          setUrlInputs((prevValue) =>
                            prevValue.filter((element) => element !== urlInput)
                          )
                        }>
                        Delete
                      </button>
                    )}
                  </div>
                ))}

                <button style={{marginBottom:'10px'}}type="button" className="btn btn-light" onClick={addImageField}>
                  Add Another Image
                </button>
                <br></br>
                <button
                  style={{marginRight:'5px'}}
                  className="btn btn-success"
                  type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={() => navigate("/")}>
                  Cancel
                </button>

                {validationErrors && (
                  <div className="alert alert-danger">{validationErrors}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGallery;
