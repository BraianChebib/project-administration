import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions";

const UserProfile = () => {
  const profile = useSelector((state) => state.profileUser);
  const authenticated = useSelector((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickSingInHandler = () => {
    navigate("/form ");
  };
  const onClickLoginHandler = () => {
    navigate("/login");
  };
  const onClickLogOutHandler = () => {
    dispatch(logOut());
    navigate("/login");
  };
  const onClickModifyUserHandler = () => {
    navigate(`/modifyUser/${profile.id}`);
  };
  const allPostsHandler = () => {
    navigate(`/posts/${profile.id}`);
  };
  return (
    <>
      {authenticated === true ? (
        profile ? (
          <>
            <h1>Name: {profile.name}</h1>
            <h2>LastName: {profile.lastName}</h2>
            <img src={`${profile.image}`} alt="Profile" />
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
            <ul>
              {profile.Posts && profile.Posts.length > 0 ? (
                profile.Posts.map((post) => (
                  <li key={post.id}>
                    <p>Comentario: {post.comment}</p>
                  </li>
                ))
              ) : (
                <p>No hay posts disponibles.</p>
              )}
              <button onClick={allPostsHandler}>All Posts</button>
            </ul>
            <button onClick={onClickModifyUserHandler}>Edit</button>
            <button onClick={onClickLogOutHandler}>Log Out</button>
          </>
        ) : (
          <p>Cargando perfil...</p>
        )
      ) : (
        <>
          <p>
            No estás autenticado. Por favor, inicia sesión para ver el perfil.
          </p>
          <button onClick={onClickSingInHandler}>Sing In</button>
          <button onClick={onClickLoginHandler}>Login</button>
        </>
      )}
    </>
  );
};

export default UserProfile;
