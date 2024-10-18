import axios from "axios";

export const GET_USERS = "GET_USERES";
export const GET_NAME_USER = "GET_NAME_USER";
export const GET_USER_PROFILE = "GET_USER_PROFILE";
export const LOG_OUT = "LOG_OUT";
export const GET_PROFILE_USER = "GET_PROFILE_USER";
export const SET_LOADING = "SET_LOADING";

export const getUsers = () => {
  return async function (dispatch) {
    const users = await axios.get("http://localhost:3001/users");
    const AllUsers = users.data;
    dispatch({ type: GET_USERS, payload: AllUsers });
  };
};

export const getNameUser = (name) => {
  return async function (dispatch) {
    dispatch({ type: SET_LOADING, payload: true });

    try {
      const nameUser = await axios.get(
        `http://localhost:3001/users?name=${name}`
      );
      const nameUse = nameUser.data;

      if (nameUse.length > 0) {
        dispatch({ type: GET_NAME_USER, payload: nameUse });
      } else {
        dispatch({ type: GET_NAME_USER, payload: [] });
      }
    } catch (error) {
      // console.error("Error al buscar el usuario:", error);
      dispatch({ type: GET_NAME_USER, payload: [] });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

export const refreshProfileUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/users/${userId}`);
    dispatch({
      type: GET_PROFILE_USER,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
  }
};

export const getUserProfile = (login) => {
  return async function (dispatch) {
    try {
      const user = await axios.post(
        "http://localhost:3001/users/userProfile",
        login
      );
      const userProfile = user.data;

      localStorage.setItem("profileUser", JSON.stringify(userProfile));
      localStorage.setItem("isAuthenticated", "true");

      dispatch({ type: GET_USER_PROFILE, payload: userProfile });
      return true;
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error: Perfil no existente, por favor ingrese nuevamente");
      return false;
    }
  };
};

export const logOut = () => {
  return async function (dispatch) {
    localStorage.removeItem("profileUser");
    localStorage.removeItem("isAuthenticated");
    dispatch({ type: LOG_OUT, payload: false });
  };
};
