import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { refreshProfileUser } from "../../../redux/actions";
import { useEffect, useState } from "react";
import "./Posts.css";
const API_URL_APP = process.env.API_URL || "http://localhost:3001";
const GetPostsUser = () => {
  const { userId } = useParams(); // Obtiene el userId de los parámetros de la URL
  const navigate = useNavigate(); // Hook para la navegación
  const dispatch = useDispatch(); // Hook para despachar acciones a Redux
  const user = useSelector((state) => state.profileUser); // Obtiene los datos del perfil de usuario del estado global
  const [posts, setPosts] = useState([]); // Estado para almacenar los posts del usuario
  const [userDataFetched, setUserDataFetched] = useState(false); // Estado para verificar si los datos del usuario se han obtenido

  // Función para obtener todos los posts de usuarios
  const allPostsAdmin = async () => {
    const allPosts = await axios.get(`${API_URL_APP}/postUser`); // Solicitud para obtener todos los posts
    setPosts(allPosts.data); // Actualiza el estado con los posts obtenidos
  };

  // Función para refrescar el perfil del usuario
  const refreshProfile = async () => {
    try {
      await dispatch(refreshProfileUser(userId)); // Despacha la acción para refrescar el perfil
    } catch (error) {
      console.error("Error al recargar el perfil:", error);
    }
  };

  // Función para obtener los datos del usuario relacionado con un post específico
  const getUserData = async (postId) => {
    try {
      const response = await axios.get(
        `${API_URL_APP}/postUser/relationUser/${postId}` // Solicitud para obtener el usuario relacionado con el post
      );
      return response.data.User; // Devuelve los datos del usuario
    } catch (error) {
      console.error(`Error al obtener ${postId}:`, error.response.data);
      throw error;
    }
  };

  // Función para obtener los datos del usuario para cada post
  const fetchUserDataForPosts = async () => {
    const userPromises = posts.map(async (post) => {
      // Mapea cada post para obtener el usuario relacionado
      if (post.id) {
        const user = await getUserData(post.id); // Obtiene los datos del usuario para el post
        return { ...post, user }; // Devuelve el post con los datos del usuario
      }
      return post; // Devuelve el post si no tiene id
    });

    const postsWithUsers = await Promise.all(userPromises); // Espera a que todas las promesas se resuelvan
    setPosts(postsWithUsers); // Actualiza el estado con los posts que incluyen los datos del usuario
  };

  useEffect(() => {
    refreshProfile(); // Llama a la función para refrescar el perfil al montar el componente
    allPostsAdmin(); // Llama a la función para obtener todos los posts
  }, [userId]);

  useEffect(() => {
    const fetchUserDataIfNeeded = async () => {
      // Verifica si los datos del usuario no se han obtenido y si hay posts
      if (!userDataFetched && posts.length > 0) {
        await fetchUserDataForPosts(); // Llama a la función para obtener los datos del usuario para los posts
        setUserDataFetched(true); // Marca los datos como obtenidos
      }
    };

    fetchUserDataIfNeeded(); // Llama a la función para obtener los datos si es necesario
  }, [posts, userDataFetched]);

  // Maneja el clic para editar un comentario
  const editCommentHandler = async (postId) => {
    navigate(`/editPosts/${userId}/${postId}`); // Redirige a la página de edición del post
    await refreshProfile(); // Refresca el perfil del usuario
  };

  // Maneja el clic para crear un nuevo post
  const onClickNewPostHandler = async () => {
    navigate(`/createPost/${userId}`); // Redirige a la página para crear un nuevo post
    await refreshProfile(); // Refresca el perfil del usuario
  };

  // Maneja el clic para eliminar un post
  const onclickDeleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este post?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL_APP}/postUser/deletePost/${id}`);
        alert("Posteo eliminado correctamente");

        // Actualiza el estado local para eliminar el post eliminado
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)); // Actualiza el estado local

        // También actualiza el estado de user.Posts
        dispatch(refreshProfileUser(userId)); // Refresca el perfil para actualizar los posts
      } catch (error) {
        alert("Error al eliminar el post: " + error.message);
      }
    }
  };

  // Maneja el clic para volver a la página de perfil de usuario
  const onClickBackHandler = () => {
    navigate("/userProfile"); // Redirige a la página de perfil de usuario
  };

  return (
    <div className="container">
      <h3>Posts User</h3>
      <div className="allPotsUser">
        {/* Contenedor para todos los posts de usuario */}
        {user.admin === true ? ( // Verifica si el usuario es un administrador
          posts.length > 0 ? ( // Verifica si hay posts disponibles
            posts.map((post) => (
              <div className="itemPostUser" key={post.id}>
                {/* Contenedor para cada post */}
                <div>
                  {post.user && ( // Verifica si hay datos del usuario relacionados con el post
                    <>
                      <div className="dataUserPost">
                        <p>
                          <strong>User: </strong>
                          {post.user.name} {post.user.lastName}{" "}
                        </p>
                        <img src={post.user.image} alt="User" />{" "}
                      </div>
                      <h5>
                        <strong>Comment: </strong>
                        {post.comment}
                      </h5>
                    </>
                  )}
                </div>
                <div className="itemPostUserButton">
                  {/* Botón para editar el comentario */}
                  <button onClick={() => editCommentHandler(post.id)}>
                    Edit Comment
                  </button>
                  <button
                    onClick={() => onclickDeleteHandler(post.id)} // Botón para eliminar el post
                    className="deletePost"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay posts disponibles</p>
          )
        ) : user.Posts && user.Posts.length > 0 ? ( // Verifica si el usuario tiene posts
          user.Posts.map((us) => (
            <div className="itemPostUser" key={us.id}>
              <div>
                <h4>{us.comment}</h4>
              </div>
              <div className="itemPostUserButton">
                {/* Botón para editar el comentario */}
                <button onClick={() => editCommentHandler(us.id)}>
                  Edit Comment
                </button>
                <button
                  onClick={() => onclickDeleteHandler(us.id)} // Botón para eliminar el post
                  className="deletePost"
                >
                  Delete Post
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <div className="itemPostUserButton">
        {/* Botón para crear un nuevo post */}
        <button onClick={onClickNewPostHandler}>Create new Post</button>{" "}
        {/* Botón para volver al perfil */}
        <button onClick={onClickBackHandler}>Back</button>{" "}
      </div>
    </div>
  );
};

export default GetPostsUser;
