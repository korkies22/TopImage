import initState from "./state";

export default function reducer(state = initState, action) {
  let index;
  let tempArray;

  switch (action.type) {
  case "ADD_CONTEST":
    console.log("Comes here",action.payload,state.contests);
    tempArray=[...state.contests];  
    if(state.contests)
      tempArray.push(action.payload.contest);
    return {
      ...state,
      contests: tempArray,
    };
  case "DELETE_CONTEST":
    index=state.contests.findIndex(el=>el._id===action.payload.id);
    tempArray=[...state.contests];  
    tempArray.splice(index,1);

    return {
      ...state,
      contests:tempArray,
    };
  case "SET_INACTIVE_CONTEST":
    index=state.activeContests.findIndex(el=>el._id===action.id);
    tempArray=[...state.activeContests];
    tempArray.splice(index,1);
    return {
      ...state,
      activeContests: tempArray,
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
