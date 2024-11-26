import { useState, useEffect } from "react";
import "./Login.css";
import { getUserProfile } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { gapi } from "gapi-script";
import { GoogleLogin } from "@react-oauth/google";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
const API_URL_APP = process.env.REACT_APP_API_URL || "http://localhost:3001";
const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CLOUDINARY = process.env.REACT_APP_URL_CLOUDINARY;

const Login = () => {
  const dispatch = useDispatch(); // Inicializa el dispatch para acciones de Redux
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const [login, setLogin] = useState({ nameUser: "", password: "" }); // Estado para manejar el inicio de sesión
  const [googleLogin, setGoogleLogin] = useState({
    name: "",
    lastName: "",
    image: "",
    email: "",
    phone: "",
    nameUser: "",
    password: "",
  });
  const autenticacion = useSelector((state) => state.isAuthenticated); // Obtiene el estado de autenticación desde Redux

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    image: "",
    email: "",
    phone: "",
    nameUser: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "", // Estado para manejar errores de validación
  });
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar password

  // useEffect(() => {
  //   const start = () => {
  //     gapi.auth2.init({ clientId: clientID });
  //   };
  //   gapi.load("client:auth2", start);
  // }, []);
  // Redirige al perfil de usuario si está autenticado
  useEffect(() => {
    if (autenticacion) navigate("/userProfile");
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alterna el estado de visibilidad del password
  };

  // Validación de correo electrónico
  const validate = (form) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(form.email)) {
      setErrors({ ...errors, email: "" }); // Limpia el error si el email es válido
    } else {
      setErrors({ ...errors, email: "Email incorrecto" }); // Establece error si el email no es válido
    }
    if (form.email === "") setErrors({ ...errors, email: "Campo vacío" }); // Establece error si el campo está vacío
  };

  // Manejar cambios en los inputs del formulario
  const onChangeHandlerForm = (event) => {
    const property = event.target.name; // Obtiene el nombre del campo
    const value = event.target.value; // Obtiene el valor del campo
    validate({ ...form, [property]: value }); // Valida el formulario
    setForm({ ...form, [property]: value }); // Actualiza el estado del formulario
  };

  // Subir imagen a Cloudinary
  const onImageUploadHandler = async (event) => {
    const file = event.target.files[0]; // Obtiene el archivo de la entrada
    const formData = new FormData();
    formData.append("file", file); // Agrega el archivo al formulario
    formData.append("upload_preset", "ucyfuf2e"); // Configuración de Cloudinary

    try {
      const response = await axios.post(CLOUDINARY, formData);
      setForm({ ...form, image: response.data.secure_url }); // Actualiza el estado con la URL de la imagen
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al subir la imagen"); // Muestra alerta en caso de error
    }
  };

  // Genera una contraseña aleatoria
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Caracteres posibles
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length) // Selecciona un carácter aleatorio
      );
    }
    return result; // Retorna la cadena generad
  };

  // Genera un Phone aleatorio
  const generateRandomPhoneNumber = () => {
    const areaCode = Math.floor(Math.random() * 900) + 100; // Código de área entre 100 y 999
    const centralOfficeCode = Math.floor(Math.random() * 900) + 100; // Parte central entre 100 y 999
    const lineNumber = Math.floor(Math.random() * 9000) + 1000; // Número de línea entre 1000 y 9999
    return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`; // Formato (XXX) XXX-XXXX
  };

  const onSubmitHandlerForm = async (event) => {
    event.preventDefault();

    if (!errors.email) {
      try {
        // Crear el usuario
        const response = await axios.post(
          `${API_URL_APP}/users/createUser`,
          form
        );
        alert("Usuario creado");

        // Autenticación solo si la creación es exitosa
        if (response.data) {
          const authenticated = await dispatch(
            getUserProfile({ email: form.email, password: form.password })
          );
          if (authenticated) {
            navigate("/userProfile"); // Redirige al perfil de usuario
          }
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || "Error en la creación del usuario";
        alert(errorMessage);
      }
    }
  };

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    // Agrega event listeners para cambiar entre los formularios de inicio de sesión y registro
    registerBtn.addEventListener("click", () => {
      container.classList.add("active"); // Activa la clase para mostrar el formulario de registro
    });

    loginBtn.addEventListener("click", () => {
      container.classList.remove("active"); // Desactiva la clase para mostrar el formulario de inicio de sesión
    });

    // Limpieza de los event listeners al desmontar el componente
    return () => {
      registerBtn.removeEventListener("click", () =>
        container.classList.add("active")
      );
      loginBtn.removeEventListener("click", () =>
        container.classList.remove("active")
      );
    };
  }, []);

  // Manejar cambios en los inputs del formulario de inicio de sesión
  const onChangeHandler = (event) => {
    const property = event.target.name; // Obtiene el nombre del campo
    const value = event.target.value; // Obtiene el valor del campo
    setLogin({ ...login, [property]: value }); // Actualiza el estado del inicio de sesión
  };

  // Manejar envío del formulario de inicio de sesión
  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const authenticated = await dispatch(getUserProfile(login)); // Autenticación en Redux
      if (authenticated) {
        navigate("/userProfile"); // Redirige al perfil de usuario
      }
    } catch (error) {
      alert(error);
    }
  };

  const onSuccessForm = async (credentialResponse) => {
    const profileObj = jwtDecode(credentialResponse?.credential);
    console.log(`soy el form enviado: ${profileObj.given_Name}`);

    const newLoginData = {
      ...googleLogin,
      name: profileObj.given_name || "", // Asigna el nombre
      lastName: profileObj.family_name || "", // Asigna el apellido
      email: profileObj.email || "", // Asigna el email
      image: profileObj.picture || "", // Asigna la imagen
      nameUser: profileObj.email.split("@")[0], // Nombre de usuario a partir del email
      password: generateRandomString(12), // Genera una contraseña aleatoria
      phone: generateRandomPhoneNumber(), // Genera un número de teléfono aleatorio
    };

    setGoogleLogin(newLoginData);

    try {
      // Crear usuario
      const createUserResponse = await axios.post(
        `${API_URL_APP}/users/createUser`,
        newLoginData
      );
      alert("Usuario creado");

      // Actualizar perfil en Redux
      dispatch(getUserProfile(createUserResponse.data));

      // Intentar autenticación
      const authenticated = await dispatch(
        getUserProfile({ email: profileObj.email }) // Autenticación en Redux usando email
      );
      if (authenticated) {
        navigate("/userProfile"); // Redirige al perfil de usuario
      } else {
        alert("Error en el inicio de sesión");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error en la creación del usuario";
      alert(errorMessage); // Muestra mensaje de error si ocurre
    }
  };

  const onSuccessGoogle = async (credentialResponse) => {
    const userInfo = jwtDecode(credentialResponse?.credential);

    try {
      const authenticated = await dispatch(
        getUserProfile({ email: userInfo.email }) // Autenticación en Redux usando email
      );
      if (authenticated) {
        navigate("/userProfile"); // Redirige al perfil de usuario
      } else {
        alert("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      alert("Error en el inicio de sesión");
    }
  };

  return (
    <div>
      <div class="container" id="container">
        <div class="form-container sign-up">
          <form onSubmit={onSubmitHandlerForm}>
            <div>
              <h3>Create Acount</h3>
              <input
                type="text"
                value={form.name}
                onChange={onChangeHandlerForm}
                name="name"
                placeholder="name"
              />
              <input
                type="text"
                value={form.lastName}
                onChange={onChangeHandlerForm}
                name="lastName"
                placeholder="Last Name"
              />
              <input
                type="file"
                onChange={onImageUploadHandler}
                name="image"
                placeholder="Image"
              />
              {form.image && (
                <img src={form.image} alt="Imagen subida" width="100" /> // Muestra la imagen subida
              )}
              <input
                type="text"
                value={form.email}
                onChange={onChangeHandlerForm}
                name="email"
                placeholder="Email"
              />
              {errors.email && <span>{errors.email}</span>}{" "}
              {/* Muestra el error de email si existe */}
              <input
                type="text"
                value={form.phone}
                onChange={onChangeHandlerForm}
                name="phone"
                placeholder="Phone"
              />
              <input
                type="text"
                value={form.nameUser}
                onChange={onChangeHandlerForm}
                name="nameUser"
                placeholder="Name User"
              />
              <div className="hiddenPassword">
                <input
                  type={showPassword ? "text" : "password"} // Alterna entre "text" y "password"
                  value={form.password}
                  onChange={onChangeHandlerForm}
                  name="password"
                  placeholder="Password"
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Muestra el icono según el estado */}
                </span>
              </div>
              <button type="submit">Enviar</button>
            </div>
          </form>
          <div className="formGoogle">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                onSuccessForm(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </div>
        </div>
        <div class="form-container sign-in">
          {/* Formulario de inicio de sesión */}
          <form onSubmit={onSubmitHandler}>
            <h1>Sign In</h1>
            <input
              type="text"
              value={login.nameUser}
              name="nameUser"
              onChange={onChangeHandler}
              placeholder="Name User"
            />
            <div className="hiddenPassword">
              <input
                type={showPassword ? "text" : "password"} // Alterna entre "text" y "password"
                value={login.password}
                name="password"
                onChange={onChangeHandler}
                placeholder="Password"
              />
              <span
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer", marginLeft: "8px" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                {/* Muestra el icono según el estado */}
              </span>
            </div>
            <button type="submit">Login</button>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                onSuccessGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </form>
        </div>
        <div class="toggle-container">
          {/* Contenedor para el toggle entre formularios */}
          <div class="toggle">
            <div class="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button class="hidden" id="login">
                Sign In
              </button>
            </div>
            <div class="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button class="hidden" id="register">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
