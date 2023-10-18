import { useState } from "react";
import Comments from "../services/comments.service";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import userContext from "../context/UserContext";

const AddComment = () => {
  const { user } = useContext(userContext);
  const [validationErrors, setValidationErrors] = useState('')
  const {id} = useParams();

  const [newComment, setNewComment] = useState({
    content: "",
    gallery_id: parseInt(id),
    author: `${user.first_name} ${user.last_name}`,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Comments.create(newComment);
      window.location.reload();
    } catch (error) {
      setValidationErrors(error.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <form style={{ width: "30%" }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Comment:</label>
          <textarea
            className="form-control"
            name="content"
            value={newComment.content}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <button className="btn btn-success" type="submit">
            Add Comment
          </button>
        </div>
        {validationErrors && (
                  <div className="alert alert-danger">{validationErrors}</div>
                )}
      </form>
    </div>
  );
};

export default AddComment;
