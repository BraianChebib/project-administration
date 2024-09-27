import { GET_USERS, GET_NAME_USER, GET_USER_PROFILE } from "./actions";

const initialState = {
  users: [],
  isAuthenticated: false,
  currentUser: null,
};
const rootReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_USERS:
      return { ...state, users: actions.payload };
    case GET_NAME_USER:
      return { ...state, users: actions.payload };
    case GET_USER_PROFILE:
      return { ...state, currentUser: actions.payload };
    default:
      return { ...state };
  }
};
export default rootReducer;
