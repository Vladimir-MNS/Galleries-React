const Comments = ({ comment }) => {
  return (
    <div className="card w-100">
      <div className="card-body p-4">
        <p><b>Author:</b> {comment.author}</p>
        <p><b>Comment text:</b>{comment.content}</p>
      </div>
    </div>
  );
};

export default Comments;
