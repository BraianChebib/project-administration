import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ModifyUser.css";
import { refreshProfileUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
const API_URL_APP = process.env.REACT_APP_API_URL || "http://localhost:3001";

const Detail = () => {
  const { id } = useParams(); // Obtiene el id del usuario desde los parámetros de la URL
  const [user, setUser] = useState(""); // Estado para almacenar la información del usuario
  const dispatch = useDispatch(); // Inicializa el dispatch para acciones de Redux
  const navigate = useNavigate(); // Inicializa el hook de navegación

  // useEffect para obtener los detalles del usuario al cargar el componente
  useEffect(() => {
    const getDetailUser = async () => {
      const detailUser = await axios.get(`${API_URL_APP}/users/${id}`); // Realiza la solicitud para obtener los detalles del usuario
      setUser(detailUser.data); // Actualiza el estado con los datos del usuario
    };
    getDetailUser(); // Llama a la función para obtener detalles del usuario
  }, []); // Se ejecuta solo una vez al montar el componente

  // Manejo de la eliminación del usuario
  const deleteHandler = async () => {
    const deleteUser = window.confirm(
      "¿estas seguro que quieres eliminar tu cuenta de usuario?"
    );
    if (deleteUser) {
      await axios.delete(`${API_URL_APP}/users/deleteUser/${id}`); // Realiza la solicitud para eliminar al usuario
      alert("usuario eliminado"); // Muestra alerta de confirmación
      navigate("/login"); // Redirige al inicio de sesión
    }
  };

  // Manejo de clic en el botón de retroceso
  const onClickBackHandler = () => {
    navigate("/userProfile"); // Redirige al perfil de usuario
  };

  // Manejo de cambios en los inputs del formulario
  const onChangeHandler = (event) => {
    const property = event.target.name; // Obtiene el nombre del campo
    const value = event.target.value; // Obtiene el valor del campo
    setUser({ ...user, [property]: value }); // Actualiza el estado del usuario
  };

  // Manejo del envío del formulario para modificar el usuario
  const submitHandler = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      axios.put(`${API_URL_APP}/users//modifyUser/${id}`, user); // Realiza la solicitud para modificar al usuario
      alert("Usuario Modificado correctamente"); // Muestra alerta de confirmación
      dispatch(refreshProfileUser(id)); // Actualiza el perfil del usuario en Redux
      navigate("/userProfile"); // Redirige al perfil de usuario
    } catch (error) {
      console.error(
        "Error al crear el usuario:",
        error.response?.data || error.message
      );
      alert("Error al crear el usuario");
    }
  };

  // Subir imagen a Cloudinary
  const onImageUploadHandler = async (event) => {
    const file = event.target.files[0]; // Obtiene el archivo de la entrada
    const formData = new FormData(); // Crea un objeto FormData
    formData.append("file", file); // Agrega el archivo al formulario
    formData.append("upload_preset", "ucyfuf2e"); // Configuración de Cloudinary

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dekk238ao/image/upload",
        formData
      ); // Realiza la solicitud para subir la imagen
      setUser({ ...user, image: response.data.secure_url }); // Actualiza el estado con la URL de la imagen
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al subir la imagen");
    }
  };

  return (
    <div className="container">
      <div>
        <form onSubmit={submitHandler}>
          {/* Formulario para modificar el usuario */}
          <div className="mainContainer">
            <label>Name: </label>
            <input
              type="text"
              value={user.name}
              onChange={onChangeHandler}
              name="name"
            />
            <label>LastName: </label>
            <input
              type="text"
              value={user.lastName}
              onChange={onChangeHandler}
              name="lastName"
            />
            <label>Image: </label>
            <input type="file" onChange={onImageUploadHandler} name="image" />
            {/* Entrada para subir imagen */}
            {user.image && (
              <img src={user.image} alt="Imagen subida" width="100" />
            )}
            <label>Email: </label>
            <input
              type="text"
              value={user.email}
              onChange={onChangeHandler}
              name="email"
            />
            <label>Phone: </label>
            <input
              type="text"
              value={user.phone}
              onChange={onChangeHandler}
              name="phone"
            />
            <label>NameUser: </label>
            <input
              type="text"
              value={user.nameUser}
              onChange={onChangeHandler}
              name="nameUser"
            />
            <label>Password: </label>
            <input
              type="password"
              value={user.password}
              onChange={onChangeHandler}
              name="password"
            />
            {/* Botón para enviar el formulario */}
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
      <div className="buttonModifyUser">
        {/* Botón para eliminar usuario */}
        <button onClick={deleteHandler} className="deleteUser">
          Delete User
        </button>
        {/* Botón para volver */}
        <button onClick={onClickBackHandler} className="backButton">
          Back
        </button>
      </div>
    </div>
  );
};

export default Detail; // Exporta el componente Detail
