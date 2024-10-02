import { GET_USERS, GET_NAME_USER, GET_USER_PROFILE, LOG_OUT } from "./actions";

const initialState = {
  users: [],
  isAuthenticated: false,
  profileUser: null,
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
    default:
      return { ...state };
  }
};
export default rootReducer;
