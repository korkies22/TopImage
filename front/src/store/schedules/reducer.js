import initState from "./state";

export default function reducer(state = initState, action) {
  switch (action.type) {
  case "SET_CURRENT_SCHEDULE":
    return {
      ...state,
      schedule: action.payload,
    };
  case "SET_SCHEDULES":
    return {
      ...state,
      schedules: action.payload.schedules,
      schedule:action.payload.schedule
    };
  case "SET_TEMPORAL_EVENT":
    return {
      ...state,
      tempEvent: action.payload
    };
  case "ADD_ITEM_TO_SCHEDULE":
    return state;
  default:
    return state;
  }
}
