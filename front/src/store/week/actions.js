export const setMonday = monday => ({
  type: "SET_CURRENT_MONDAY",
  payload: monday,
});

export const setActCurMonday = monday => ({
  type: "SET_ACT_CURRENT_MONDAY",
  payload: monday,
});

export const reselectCurMonday = () => ({
  type: "RESELECT_CURRENT_MONDAY"
});
