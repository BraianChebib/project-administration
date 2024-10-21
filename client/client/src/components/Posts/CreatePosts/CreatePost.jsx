import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CreatePosts.css";
const API_URL_APP = process.env.API_URL || "http://localhost:3001";

const CreatePost = () => {
  const { userId } = useParams(); // Obtiene el userId de los parámetros de la URL
  const [input, setInput] = useState({ comment: "", UserId: userId }); // Estado para manejar el contenido del post y el ID del usuario
  const navigate = useNavigate(); // Hook para la navegación

  // Maneja los cambios en el campo de entrada
  const onChangeInputHandler = (e) => {
    const newPost = e.target.value; // Obtiene el nuevo valor del campo de entrada
    setInput((prevState) => ({ ...prevState, comment: newPost })); // Actualiza el estado del post
  };

  // Maneja el envío del formulario
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL_APP}/postUser/`, input); // Envía el nuevo post al servidor
    navigate(`/posts/${userId}`); // Redirige a la página de posts del usuario
  };

  // Maneja el clic en el botón de "Back"
  const onClickHandler = () => {
    navigate(`/posts/${userId}`); // Redirige a la página de posts del usuario
  };

  return (
    <div className="container">
      <div className="formContainer">
        {/* Contenedor del formulario */}
        <form onSubmit={onSubmitHandler}>
          <h3>ingrese el posteo</h3>
          <input
            type="text"
            value={input.comment} // Valor del campo de entrada
            onChange={onChangeInputHandler} // Maneja los cambios en el campo de entrada
          />
          {/* Botón para enviar el formulario */}
          <button type="submit">enviar</button>{" "}
        </form>
        <div className="backButtonContainer">
          {/* Botón para volver */}
          <button onClick={onClickHandler} className="backButton">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
