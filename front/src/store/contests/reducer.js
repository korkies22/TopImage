import initState from "./state";

export default function reducer(state = initState, action) {
  switch (action.type) {
  case "SET_INACTIVE_CONTEST":
    return {
      ...state,
      id: action.id,
    };
  case "SET_CONTESTS":
    return {
      ...state,
      contests: action.payload.contests,
      activeContests:action.payload.activeContests
    };
  default:
    return state;
  }
}
