import initState from "./state";

export default function reducer(state = initState, action) {
  console.log("Action",action.type,action.payload);
  switch (action.type) {
  case "SET_ACCESS_KEY":
    return {
      ...state,
      accessKey: action.payload,
    };
  default:
    return state;
  }
}
