export const addContest = (contest) =>({
  type: "ADD_CONTEST",
  payload: {
    contest:contest
  }
});

export const updateContest = (data) =>{
  console.log("Received data",data);
  return {
    type: "UPDATE_CONTEST",
    payload: data  
  };
};


export const updateCurContest = (data) =>{
  console.log("Received data cur",data);
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
  console.log("Set contest");
  return{
    type: "SET_CONTESTS",
    payload: {
      contests:contests,
      activeContests:contests.filter(el=>{
        let date=new Date(el.endDate);
        console.log(el.endDate,date.getTime(),compareDate.getTime());
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