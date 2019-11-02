import initState from './state';

export default function reducer(state = initState, action) {
  let index;
  let tempArray;

  switch (action.type) {
    case 'ADD_CONTEST':
      index = state.contests.findIndex(el => el._id === action.payload.id);
      tempArray = [...state.contests];
      if (index !== -1) tempArray[index] = action.payload.contest;
      else if (state.contests) tempArray.push(action.payload.contest);

      return {
        ...state,
        contests: tempArray,
      };
    case 'UPDATE_CONTEST':
      console.log('llega reducer update',action.payload.id)
      let curContestTemp = { ...state.curContest };
      if (curContestTemp['_id'] === action.payload.id) {
        console.log('llega reducer update 2')
        curContestTemp.images = action.payload.images;
      }
      index = state.contests.findIndex(el => el._id === action.payload.id);
      tempArray = [...state.contests];
      if (index === -1) return state;

      let item = tempArray[index];
      for (let key in action.payload) {
        item[key] = action.payload[key];
      }

      tempArray[index] = item;
      return {
        ...state,
        contests: tempArray,
        curContest: curContestTemp,
      };
    case 'DELETE_CONTEST':
      index = state.contests.findIndex(el => el._id === action.payload.id);
      tempArray = [...state.contests];
      tempArray.splice(index, 1);

      return {
        ...state,
        contests: tempArray,
      };
    case 'SET_INACTIVE_CONTEST':
      index = state.activeContests.findIndex(el => el._id === action.id);
      tempArray = [...state.activeContests];
      tempArray.splice(index, 1);
      return {
        ...state,
        activeContests: tempArray,
      };
    case 'SET_CONTESTS':
      return {
        ...state,
        contests: action.payload.contests,
        activeContests: action.payload.activeContests,
      };
    case 'SET_CONTEST':
      return {
        ...state,
        curContest: action.payload.contest,
      };

    default:
      return state;
  }
}
