import initState from "./state";

export default function reducer(state=initState, action) {
  switch (action.type) {
  case "ADD_EVENT":
    return {
      ...state,
      events: action.payload,
    };
  default:
    return state;
  }
}
