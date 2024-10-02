import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const GetPosts = () => {
  const user = useSelector((state) => state.profileUser);
  const navigate = useNavigate();
  const { userId } = useParams();
  const editCommentHandler = (postId) => {
    navigate(`/editPosts/${userId}/${postId}`);
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
                </li>
              </>
            );
          })
        ) : (
          <p>Cargando...</p>
        )}
      </li>
    </>
  );
};

export default GetPosts;
