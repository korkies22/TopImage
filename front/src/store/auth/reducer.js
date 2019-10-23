import initState from "./state";

export default function reducer(state = initState, action) {
  switch (action.type) {
  case "SET_TOKEN":
    return {
      ...state,
      token: action.payload,
    };
  case "SET_USER":
    return {
      ...state,
      user: action.payload,
    };
  case "SET_AUTH":
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      tokenTimeout: action.payload.tokenTimeout,
      refreshToken: action.payload.refreshToken,
    };
  case "LOGOUT": {
    return {
      user: null,
      token: null,
      tokenTimeout: null,
      refreshToken: null,
    };
  }
  default:
    return state;
  }
}
