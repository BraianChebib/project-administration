import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPost.css";
const API_URL_APP = process.env.REACT_APP_API_URL || "http://localhost:3001";

const EditPost = () => {
  const { userId, postId } = useParams(); // Obtiene el userId y postId de los parámetros de la URL
  const [input, setInput] = useState({ id: postId, comment: "" }); // Estado para manejar la entrada del post (ID y comentario)
  const navigate = useNavigate(); // Hook para la navegación

  // Obtener los datos del post cuando el componente se monta
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${API_URL_APP}/postUser/${postId}` // Solicitud para obtener el post por su ID
        );
        setInput({ id: postId, comment: response.data.comment }); // Actualiza el estado con el comentario actual
      } catch (error) {
        console.error("Error al obtener el post:", error);
      }
    };
    getPost(); // Llama a la función para obtener los datos del post
  }, [postId]);

  // Maneja los cambios en el campo de entrada
  const onChangeInputHandler = (e) => {
    const postComment = e.target.value; // Obtiene el nuevo valor del campo de entrada
    setInput((prevState) => ({ ...prevState, comment: postComment })); // Actualiza el estado del comentario
  };

  // Maneja el envío del formulario
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.put(`${API_URL_APP}/postUser/modifyPost`, input); // Envía el comentario modificado al servidor
    navigate(`/posts/${userId}`); // Redirige a la página de posts del usuario
  };

  // Maneja el clic en el botón de "Back"
  const onclickHandler = () => {
    navigate(`/posts/${userId}`); // Redirige a la página de posts del usuario
  };

  return (
    <div className="container">
      <div className="editPostsContainer">
        {/* Contenedor para editar el post */}
        <form onSubmit={onSubmitHandler}>
          <h3>Modificar comentario del post:</h3>
          <input
            type="text"
            value={input.comment} // Valor del campo de entrada
            onChange={onChangeInputHandler} // Maneja los cambios en el campo de entrada
          />
          <button>Enviar</button> {/* Botón para enviar el formulario */}
        </form>
        <div className="backButtonContainer">
          {/* Botón para volver */}
          <button onClick={onclickHandler} className="backButton">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
