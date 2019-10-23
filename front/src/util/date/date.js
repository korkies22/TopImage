export const getMonday = d => {
  let today= new Date(d);
  let day = today.getDay(),
    diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(today.setDate(diff));
};
