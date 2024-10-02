import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const GetPosts = () => {
  const user = useSelector((state) => state.profileUser);
  const navigate = useNavigate();
  const { userId } = useParams();
  const editCommentHandler = (postId) => {
    navigate(`/editPosts/${userId}/${postId}`);
  };
  const onClickNewPostHandler = () => {
    navigate(`/createPost/${userId}`);
  };
  const onclickDeleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/postUser/deletePost/${id}`);
      alert("Posteo eliminado correctamente");
      navigate("/userProfile");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <li>
        {user.Posts && user.Posts.length > 0 ? (
          user.Posts.map((us) => {
            return (
              <>
                <li key={us.id}>
                  <h1>{us.comment}</h1>;
                  <button onClick={() => editCommentHandler(us.id)}>
                    Edit Comment
                  </button>
                  <button onClick={() => onclickDeleteHandler(us.id)}>
                    Delete Post
                  </button>
                </li>
              </>
            );
          })
        ) : (
          <p>Cargando...</p>
        )}
        <button onClick={onClickNewPostHandler}>crear un nuevo Post</button>
      </li>
    </>
  );
};

export default GetPosts;
