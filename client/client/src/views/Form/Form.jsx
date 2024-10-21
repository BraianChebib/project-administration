import { useState, useEffect } from "react";
import style from "./Form.module.css";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../redux/actions";
import { useDispatch } from "react-redux";
const API_URL_APP = process.env.API_URL || "http://localhost:3001";
const Form = () => {
  const navigate = useNavigate(); // Inicializa useNavigate para redirigir a otras rutas
  const dispatch = useDispatch(); // Hook para obtener el dispatch de Redux

  // Estado local para almacenar los datos del formulario
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    image: "",
    email: "",
    phone: "",
    nameUser: "",
    password: "",
  });

  // Estado local para almacenar los errores de validación
  const [errors, setErrors] = useState({
    email: "",
  });

  // Inicializa la autenticación de Google
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId:
          "133661170359-fkebjnpt8sudfqujbcjbjrtj1cc8veoc.apps.googleusercontent.com", // ID del cliente de Google
      });
    };
    gapi.load("client:auth2", initClient); // Carga la API de cliente de Google
  }, []);

  // Función para validar el correo electrónico
  const validate = (form) => {
    // Expresión regular para validar el formato del correo electrónico
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(form.email)) {
      setErrors({ ...errors, email: "" }); // Si es válido, borra el error
    } else {
      setErrors({ ...errors, email: "Email incorrecto" }); // Si no es válido, establece el mensaje de error
    }
    if (form.email === "") setErrors({ ...errors, email: "Campo vacío" }); // Verifica si el campo está vacío
  };

  // Maneja los cambios en los inputs del formulario
  const onChangeHandler = (event) => {
    const property = event.target.name; // Obtiene el nombre de la propiedad que cambió
    const value = event.target.value; // Obtiene el nuevo valor
    validate({ ...form, [property]: value }); // Valida el formulario con el nuevo valor
    setForm({ ...form, [property]: value }); // Actualiza el estado del formulario
  };

  // Maneja la carga de imágenes en Cloudinary
  const onImageUploadHandler = async (event) => {
    const file = event.target.files[0]; // Obtiene el archivo de la carga
    const formData = new FormData(); // Crea un objeto FormData para enviar el archivo
    formData.append("file", file); // Agrega el archivo al FormData
    formData.append("upload_preset", "ucyfuf2e"); // Agrega el preset de carga

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dekk238ao/image/upload",
        formData // Realiza la solicitud a Cloudinary para cargar la imagen
      );
      setForm({ ...form, image: response.data.secure_url }); // Establece la URL de la imagen en el estado
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al subir la imagen");
    }
  };

  // Función para generar una contraseña aleatoria
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Caracteres permitidos
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      ); // Selecciona un carácter aleatorio
    }
    return result; // Devuelve la cadena aleatoria generada
  };

  // Maneja el envío del formulario
  const submitHandler = (event) => {
    event.preventDefault();
    if (!errors.email) {
      // Verifica que no haya errores de correo
      try {
        axios
          .post(`${API_URL_APP}/users/createUser`, form) // Envía los datos del formulario al servidor
          .then((res) => alert("Usuario creado"))
          .catch((err) => {
            const errorMessage =
              err.response?.data?.error || "Error en la creación del usuario";
            alert(errorMessage);
          });
      } catch (error) {
        alert(
          "Error al crear el usuario:",
          error.response?.data || error.message
        );
      }
    }
  };

  // Maneja la respuesta exitosa del inicio de sesión con Google
  const onSuccessGoogle = async (response) => {
    const userInfo = response.profileObj; // Obtiene la información del perfil del usuario de Google

    // Genera valores aleatorios para el teléfono y nombre de usuario
    const randomPhone = `+1${
      Math.floor(Math.random() * 9000000000) + 1000000000
    }`; // Genera un número de teléfono aleatorio
    const randomNameUser = `${userInfo.givenName}${
      userInfo.familyName
    }${Math.floor(Math.random() * 1000)}`; // Genera un nombre de usuario aleatorio
    const randomPassword = generateRandomString(12); // Genera una contraseña aleatoria de 12 caracteres

    // Establece los valores en el formulario
    setForm({
      ...form,
      name: userInfo.givenName,
      lastName: userInfo.familyName,
      email: userInfo.email,
      image: userInfo.imageUrl,
      phone: randomPhone,
      nameUser: randomNameUser,
      password: randomPassword,
    });

    // Envía los datos al servidor
    try {
      const res = await axios.post(`${API_URL_APP}/users/createUser`, {
        name: userInfo.givenName,
        lastName: userInfo.familyName,
        email: userInfo.email,
        image: userInfo.imageUrl,
        phone: randomPhone,
        nameUser: randomNameUser,
        password: randomPassword,
      });

      // Redirige al perfil del usuario
      alert("Usuario creado con Google: " + res.data.message); // Alerta de éxito
      const authenticated = await dispatch(
        getUserProfile({ nameUser: randomNameUser, password: randomPassword })
      );
      if (authenticated) {
        navigate("/userProfile"); // Redirige al perfil del usuario
      }
    } catch (error) {
      alert("Usuario ya existente, por favor modifique los datos");
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className={style.mainContainer}>
          <label>Name: </label>
          <input
            type="text"
            value={form.name}
            onChange={onChangeHandler} // Maneja los cambios en el input
            name="name"
          />
          <label>LastName: </label>
          <input
            type="text"
            value={form.lastName}
            onChange={onChangeHandler}
            name="lastName"
          />
          <label>Image: </label>
          <input type="file" onChange={onImageUploadHandler} name="image" />
          {form.image && (
            <img src={form.image} alt="Imagen subida" width="100" /> // Muestra la imagen cargada
          )}
          <label>Email: </label>
          <input
            type="text"
            value={form.email}
            onChange={onChangeHandler}
            name="email"
          />
          {errors.email && <span>{errors.email}</span>}
          <label>Phone: </label>
          <input
            type="text"
            value={form.phone}
            onChange={onChangeHandler}
            name="phone"
          />
          <label>NameUser: </label>
          <input
            type="text"
            value={form.nameUser}
            onChange={onChangeHandler}
            name="nameUser"
          />
          <label>Password: </label>
          <input
            type="password"
            value={form.password}
            onChange={onChangeHandler}
            name="password"
          />
          <button type="submit">Enviar</button>{" "}
          {/* Botón para enviar el formulario */}
        </div>
      </form>

      <div className={style.oauthContainer}>
        <p>O inicia sesión con Google:</p>
        <GoogleLogin
          clientId="133661170359-fkebjnpt8sudfqujbcjbjrtj1cc8veoc.apps.googleusercontent.com" // ID del cliente de Google
          buttonText="Login with Google" // Texto del botón
          onSuccess={onSuccessGoogle} // Maneja la respuesta exitosa del inicio de sesión
          cookiePolicy={"single_host_origin"} // Política de cookies
        />
      </div>
    </div>
  );
};

export default Form;
