import { combineReducers, createStore } from "redux";
import auth from "./auth";
import events from "./events";
import schedules from "./schedules";
import week from "./week";

import root from "./root";

const reducers = combineReducers({
  events,
  schedules,
  auth,
  week,
  root
});

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
