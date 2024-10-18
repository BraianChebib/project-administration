import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { refreshProfileUser, getUsers } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams(); // Obtiene el ID del usuario desde los parámetros de la URL
  const [user, setUser] = useState(""); // Estado para almacenar la información del usuario
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux

  // Efecto para obtener los detalles del usuario al montar el componente
  useEffect(() => {
    const getDetailUser = async () => {
      const detailUser = await axios.get(`http://localhost:3001/users/${id}`); // Función para obtener los detalles del usuario
      setUser(detailUser.data); // Actualiza el estado con los datos del usuario
    };
    getDetailUser(); // Llama a la función para obtener los datos
  }, [id]); // Se vuelve a ejecutar si el ID cambia

  // Maneja la eliminación de un usuario
  const deleteHandlerUser = async () => {
    const deleteUser = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (deleteUser) {
      try {
        await axios.delete(`http://localhost:3001/users/deleteUser/${id}`); // Solicitud para eliminar el usuario
        alert("Usuario eliminado"); // Mensaje de éxito

        // Actualizamos la lista de usuarios en Redux
        dispatch(getUsers()); // Dispatch de la acción para obtener la lista actualizada de usuarios

        // Redirigimos al home
        navigate("/home"); // Navega a la ruta de inicio
      } catch (error) {
        alert("Error al eliminar el usuario: " + error.message);
      }
    }
  };

  // Maneja la eliminación de un post
  const onclickDeletePostHandler = async (postId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este post?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:3001/postUser/deletePost/${postId}` // Solicitud para eliminar el post
        );
        alert("Post eliminado correctamente"); // Mensaje de éxito

        // Aquí filtramos el post eliminado del estado local
        const updatedPosts = user.Posts.filter((post) => post.id !== postId); // Filtra el post eliminado
        setUser({ ...user, Posts: updatedPosts }); // Actualiza el estado del usuario con los posts restantes
        dispatch(getUsers()); // Vuelve a obtener la lista de usuarios
        navigate("/home"); // Navega a la ruta de inicio
      } catch (error) {
        alert("Error al eliminar el post: " + error.message);
      }
    }
  };

  // Maneja el clic en el botón de volver
  const onClickBackHandler = () => {
    navigate("/home"); // Navega a la ruta de inicio
  };

  return (
    <div className="container">
      {user && ( // Verifica si existe un usuario
        <>
          <div className="headContainer">
            <h1>
              {user.name} {user.lastName}
            </h1>
            <img src={`${user.image}`} alt={`${user.name} ${user.lastName}`} />{" "}
          </div>
          <div className="dateUser">
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>
            <p>
              <strong>Teléfono: </strong>
              {user.phone}
            </p>
            <p>
              <strong>Usuario:</strong> {user.nameUser}
            </p>
            <p>
              <strong>Contraseña:</strong> {user.password}
            </p>
          </div>
          <div className="postsUser">
            {user.Posts && user.Posts.length > 0 ? ( // Verifica si el usuario tiene posts
              user.Posts.map((post) => (
                <div className="cardsContainer" key={post.id}>
                  <p>{post.comment}</p>
                  <button
                    onClick={() => onclickDeletePostHandler(post.id)}
                    className="deletePost"
                  >
                    Delete post
                  </button>
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </>
      )}
      <div className="buttonModifyUser">
        <button onClick={deleteHandlerUser} className="deleteUser">
          Delete User
        </button>
        <button onClick={onClickBackHandler} className="backButton">
          Back
        </button>
      </div>
    </div>
  );
};

export default Detail;
