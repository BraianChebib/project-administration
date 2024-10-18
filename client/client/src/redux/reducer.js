import {
  GET_USERS,
  GET_NAME_USER,
  GET_USER_PROFILE,
  LOG_OUT,
  GET_PROFILE_USER,
  SET_LOADING,
} from "./actions";

const initialState = {
  users: [],
  isAuthenticated:
    localStorage.getItem("isAuthenticated") === "true" ? true : false,
  profileUser: JSON.parse(localStorage.getItem("profileUser")) || null,
  loading: false,
  posts: [],
};
const rootReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_USERS:
      return { ...state, users: actions.payload };
    case GET_NAME_USER:
      return { ...state, users: actions.payload };
    case GET_USER_PROFILE:
      return { ...state, isAuthenticated: true, profileUser: actions.payload };
    case LOG_OUT:
      return { ...state, isAuthenticated: actions.payload };
    case GET_PROFILE_USER:
      return {
        ...state,
        profileUser: actions.payload,
      };
    case SET_LOADING:
      return { ...state, loading: actions.payload };
    default:
      return { ...state };
  }
};
export default rootReducer;
