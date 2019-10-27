export const addContest = (contest) =>({
  type: "ADD_CONTEST",
    payload: {
      contest:contest
    }
})

export const deleteContest = (id) =>({
  type: "DELETE_CONTEST",
    payload: {
      id:id
    }
})

export const setContests = (contests) => {
  let compareDate=new Date();
  return{
    type: "SET_CONTESTS",
    payload: {
      contests:contests,
      activeContests:contests.filter(el=>{
        let date=new Date(el.endDate);
        console.log(el.endDate,date.getTime(),compareDate.getTime());
        return new Date(el.endDate).getTime()>compareDate.getTime()
      })
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