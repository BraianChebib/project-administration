import axios from "axios";

export const GET_USERS = "GET_USERES";
export const GET_NAME_USER = "GET_NAME_USER";
export const GET_USER_PROFILE = "GET_USER_PROFILE";

export const getUsers = () => {
  return async function (dispatch) {
    const users = await axios.get("http://localhost:3001/users");
    const AllUsers = users.data;
    dispatch({ type: GET_USERS, payload: AllUsers });
  };
};

export const getNameUser = (name) => {
  return async function (dispatch) {
    const nameUser = await axios.get(
      `http://localhost:3001/users?name=${name}`
    );
    const nameUse = nameUser.data;
    dispatch({ type: GET_NAME_USER, payload: nameUse });
  };
};

export const getUserProfile = (login) => {
  return async function (dispatch) {
    try {
      const user = await axios.post(
        "http://localhost:3001/users/userProfile",
        login
      );
      const userProfile = user.data;
      dispatch({ type: GET_USER_PROFILE, payload: userProfile });
    } catch (error) {
      console.error(
        "Error al buscar el profile el usuario:",
        error.response?.data || error.message
      );
      alert("Error al buscar el profile el usuario:");
    }
  };
};
