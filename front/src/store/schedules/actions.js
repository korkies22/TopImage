export const setCurrentSchedule = schedule => ({
  type: "SET_CURRENT_SCHEDULE",
  payload: schedule,
});

export const addItem = item => ({
  type: "ADD_ITEM_TO_SCHEDULE",
  payload: item,
});

export const setSchedules = (schedules,scheduleIndex) => ({
  type: "SET_SCHEDULES",
  payload: {
    schedules:schedules,
    schedule:schedules[scheduleIndex]
  },
});

export const setTempEvent = event => ({
  type: "SET_TEMPORAL_EVENT",
  payload: event,
});