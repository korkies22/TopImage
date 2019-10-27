export const setContests = (contests) => {
  let compareDate=new Date();
  return{
    type: "SET_CONTESTS",
    payload: {
      contests:contests,
      activeContests:contests.filter(el=>(
        new Date(el.endDate)<compareDate
      ))
    }
  }
};

export const setInactiveContest = (id) => 
  ({
    type: "SET_INACTIVE_CONTEST",
    payload: {
      id:id
    }
  });