export const addContest = (contest) =>({
  type: "ADD_CONTEST",
  payload: {
    contest:contest
  }
});

export const updateContest = (data) =>{
  return {
    type: "UPDATE_CONTEST",
    payload: data  
  };
};


export const updateCurContest = (data) =>{
  return {
    type: "UPDATE_CUR_CONTEST",
    payload: data  
  };
};

export const deleteContest = (id) =>({
  type: "DELETE_CONTEST",
  payload: {
    id:id
  }
});

export const setContests = (contests) => {
  let compareDate=new Date();
  return{
    type: "SET_CONTESTS",
    payload: {
      contests:contests,
      activeContests:contests.filter(el=>{
        let date=new Date(el.endDate);
        return date.getTime()>compareDate.getTime();
      })
    }
  };
};

export const setCurContest = (contest) => {
  return{
    type: "SET_CONTEST",
    payload: {
      contest
    }
  };
};

export const setInactiveContest = (id) => 
  ({
    type: "SET_INACTIVE_CONTEST",
    payload: {
      id:id
    }
  });