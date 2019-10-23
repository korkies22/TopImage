import initState from "./state";

export default function reducer(state = initState, action) {
  switch (action.type) {
  case "SET_CURRENT_MONDAY":
    return {
      ...state,
      curMonday: action.payload,
    };
  case "SET_ACT_CURRENT_MONDAY":
    return {
      ...state,
      actCurMonday: action.payload,
    };
  case "RESELECT_CURRENT_MONDAY":
    return {
      ...state,
      curMonday: state.actCurMonday,
    };
  default:
    return state;
  }
}
