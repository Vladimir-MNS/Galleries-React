import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Galleries from "../services/galleries.service";
import userContext from "../context/UserContext";

const EditGallery = () => {
  const { user } = useContext(userContext);
  const { id } = useParams();

  console.log(id);

  const [newGallery, setNewGallery] = useState({
    name: "",
    description: "",
    images: [],
    user_id: user.id,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { data } = await Galleries.get(id);

        if (isMounted) {
          setNewGallery(data);
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

  const [urlInputs, setUrlInputs] = useState([newGallery.images.length]);

  const navigate = useNavigate();

  const addImageField = () => {
    setUrlInputs((prevFields) => [...prevFields, prevFields.length + 1]);
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

  console.log(newGallery);
  let error = "";

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
                  <div className="form-outline mb-4">
                    <input
                      type="url"
                      name={`image ${urlInput}`}
                      className="form-control form-control-lg"
                      value={newGallery.images[urlInput - 1]}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                    <label className="form-label">Image {urlInput}</label>
                    {index != 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          setUrlInputs((prevValue) =>
                            prevValue.filter((element) => element != urlInput)
                          )
                        }>
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(index) => {
                        if (index > 0) {
                          const updatedInputs = [...urlInputs];
                          const temp = updatedInputs[index];
                          updatedInputs[index] = updatedInputs[index - 1];
                          updatedInputs[index - 1] = temp;
                          return setUrlInputs(updatedInputs);
                        }
                      }}>
                      MoveUp
                    </button>
                  </div>
                ))}

                <button type="button" onClick={addImageField}>
                  Add Another Image
                </button>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-primary btn-lg btn-block"
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
