import { useState, useEffect } from "react";
import "./Login.css";
import { getUserProfile } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch(); // Inicializa el dispatch para acciones de Redux
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const [login, setLogin] = useState({ nameUser: "", password: "" }); // Estado para manejar el inicio de sesión
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

  // Redirige al perfil de usuario si está autenticado
  useEffect(() => {
    if (autenticacion) navigate("/userProfile");
  });

  // Inicializar gapi autenticación con Google
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId:
          "133661170359-fkebjnpt8sudfqujbcjbjrtj1cc8veoc.apps.googleusercontent.com", // ID de cliente de Google
      });
    };
    gapi.load("client:auth2", initClient); // Carga la API de Google
  }, []);

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
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dekk238ao/image/upload",
        formData
      );
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
    return result; // Retorna la cadena generada
  };

  // Manejar envío del formulario de registro
  const submitHandler = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (!errors.email) {
      try {
        axios
          .post("http://localhost:3001/users/createUser", form) // Envía los datos al servidor
          .then((res) => alert("Usuario creado")) // Muestra alerta si el usuario fue creado
          .catch((err) => {
            const errorMessage =
              err.response?.data?.error || "Error en la creación del usuario";
            alert(errorMessage); // Muestra mensaje de error en caso de que ocurra algo mal
          });
      } catch (error) {
        alert(
          "Error al crear el usuario:",
          error.response?.data || error.message
        ); // Muestra alerta en caso de error
      }
    }
  };

  // Manejo del inicio de sesión con Google
  const onSuccessGoogleForm = async (response) => {
    const userInfo = response.profileObj; // Información del perfil de Google

    // Generar valores aleatorios
    const randomPhone = `+1${
      Math.floor(Math.random() * 9000000000) + 1000000000
    }`; // Generar número de teléfono aleatorio
    const randomNameUser = `${userInfo.givenName}${
      userInfo.familyName
    }${Math.floor(Math.random() * 1000)}`; // Generar nombre de usuario aleatorio
    const randomPassword = generateRandomString(12); // Generar contraseña aleatoria de 12 caracteres

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

    // Enviar los datos al servidor
    try {
      const res = await axios.post("http://localhost:3001/users/createUser", {
        name: userInfo.givenName,
        lastName: userInfo.familyName,
        email: userInfo.email,
        image: userInfo.imageUrl,
        phone: randomPhone,
        nameUser: randomNameUser,
        password: randomPassword,
      });

      // Redirigir al perfil del usuario
      alert("Usuario creado con Google: " + res.data.message);
      const authenticated = await dispatch(
        getUserProfile({ nameUser: randomNameUser, password: randomPassword }) // Autenticación en Redux
      );
      if (authenticated) {
        navigate("/userProfile"); // Redirige al perfil de usuario
      }
    } catch (error) {
      alert("Usuario ya existente, por favor modifique los datos");
    }
  };

  // Inicializar gapi autenticación con Google
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId:
          "133661170359-fkebjnpt8sudfqujbcjbjrtj1cc8veoc.apps.googleusercontent.com", // ID de cliente de Google
        scope: "email", // Alcance de la autenticación
      });
    };
    gapi.load("client:auth2", initClient); // Carga la API de Google
  }, []);

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

  // Manejo del inicio de sesión con Google
  const onSuccessGoogle = async (response) => {
    const userInfo = response.profileObj; // Información del perfil de Google

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
          <form onSubmit={submitHandler}>
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
              <input
                type="password"
                value={form.password}
                onChange={onChangeHandlerForm}
                name="password"
                placeholder="Password"
              />
              <button type="submit">Enviar</button>
              <p>Or sign in with Google:</p>
              <GoogleLogin
                clientId="133661170359-fkebjnpt8sudfqujbcjbjrtj1cc8veoc.apps.googleusercontent.com" // ID de cliente de Google
                buttonText="Login with Google"
                onSuccess={onSuccessGoogleForm} // Callback para el éxito
                cookiePolicy={"single_host_origin"} // Política de cookies
              />
            </div>
          </form>
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
            <input
              type="password"
              value={login.password}
              name="password"
              onChange={onChangeHandler}
              placeholder="Password"
            />
            <button type="submit">Login</button>
            <p>Or sign in with Google:</p>
            <GoogleLogin
              clientId="133661170359-fkebjnpt8sudfqujbcjbjrtj1cc8veoc.apps.googleusercontent.com" // ID de cliente de Google
              buttonText="Login with Google"
              onSuccess={onSuccessGoogle} // Callback para el éxito
              cookiePolicy={"single_host_origin"} // Política de cookies
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
