import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions";
import { useEffect, useState } from "react";
import { refreshProfileUser } from "../../redux/actions";
import axios from "axios";
import "./userProfile.css";
const API_URL_APP = process.env.REACT_APP_API_URL || "http://localhost:3001";

const UserProfile = () => {
  const profile = useSelector((state) => state.profileUser); // Obtiene el perfil del usuario del estado global
  const authenticated = useSelector((state) => state.isAuthenticated); // Verifica si el usuario está autenticado
  const navigate = useNavigate(); // Hook para la navegación
  const dispatch = useDispatch(); // Hook para despachar acciones a Redux
  const [showMore, setShowMore] = useState(false); // Estado para manejar la expansión de publicaciones
  const [posts, setPosts] = useState([]); // Estado para almacenar los posts del usuario
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es admin

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    if (authenticated && profile?.id) {
      dispatch(refreshProfileUser(profile.id));
    }
  }, [authenticated, profile?.id, dispatch]);

  useEffect(() => {
    if (profile?.admin) {
      setIsAdmin(true);
      axios.get(`${API_URL_APP}/postUser`).then((response) => {
        setPosts(response.data);
      });
    } else {
      setPosts(profile.Posts);
    }
  }, [profile]);

  // Maneja el clic para navegar a la página de registro
  const onClickSingInHandler = () => {
    navigate("/form "); // Redirige a la página de registro
  };

  // Maneja el clic para navegar a la página de login
  const onClickLoginHandler = () => {
    navigate("/login"); // Redirige a la página de login
  };

  // Maneja el clic para cerrar sesión
  const onClickLogOutHandler = () => {
    const closeSesion = window.confirm("¿Cerrar Sesión?");
    if (closeSesion) {
      dispatch(logOut()); // Despacha la acción de cerrar sesión
      navigate("/login"); // Redirige a la página de login
    }
  };

  // Maneja el clic para modificar el perfil del usuario
  const onClickModifyUserHandler = () => {
    navigate(`/modifyUser/${profile.id}`); // Redirige a la página de modificación del perfil
  };

  // Maneja el clic para ver todos los posts del usuario
  const allPostsHandler = () => {
    navigate(`/posts/${profile.id}`); // Redirige a la página de posts del usuario
  };

  // Maneja la visualización de más publicaciones
  const handleShowMore = () => {
    setShowMore(!showMore); // Cambia el estado de mostrar más o menos publicaciones
  };

  return (
    <div className="container">
      {authenticated === true ? ( // Verifica si el usuario está autenticado
        profile ? ( // Verifica si se ha cargado el perfil
          <div className="dateUser">
            <div className="dateUserHead">
              <div className="dateUserLeft">
                <h1>
                  {profile.name} {profile.lastName}{" "}
                </h1>
                <h3>All Posts User</h3>
              </div>
              <div className="dateUserRight">
                <img src={`${profile.image}`} alt="Profile" />{" "}
              </div>
            </div>
            <div className="dateUserButton">
              <ul>
                {posts && posts.length > 0 ? ( // Verifica si hay posts disponibles
                  posts.slice(0, showMore ? posts.length : 3).map((post) => (
                    <div className="dateUserButtonItems" key={post.id}>
                      <li>
                        <p>{post.comment}</p>
                      </li>
                    </div>
                  ))
                ) : (
                  <p>No hay posts disponibles.</p>
                )}
              </ul>
              {posts &&
                posts.length > 3 && ( // Verifica si hay más de 3 posts para mostrar el botón "Mostrar más"
                  <div className="showMoreButton">
                    <button className="buttonNew" onClick={handleShowMore}>
                      {showMore ? "Mostrar menos" : "Mostrar más"}
                    </button>
                  </div>
                )}
            </div>
            <div className="dateUserFoot">
              <button onClick={allPostsHandler}>All Posts</button>{" "}
              {/* Botón para ver todos los posts */}
              <button onClick={onClickModifyUserHandler}>
                Edit Profile
              </button>{" "}
              {/* Botón para editar el perfil */}
              <button onClick={onClickLogOutHandler} className="backButton">
                {" "}
                {/* Botón para cerrar sesión */}
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <p>Cargando perfil...</p>
        )
      ) : (
        <>
          <p>
            No estás autenticado. Por favor, inicia sesión para ver el perfil.
          </p>
          <button onClick={onClickSingInHandler}>Sing In</button>{" "}
          {/* Botón para ir a la página de registro */}
          <button onClick={onClickLoginHandler}>Login</button>{" "}
          {/* Botón para ir a la página de login */}
        </>
      )}
    </div>
  );
};

export default UserProfile;
