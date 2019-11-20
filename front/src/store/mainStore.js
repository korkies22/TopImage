import { combineReducers, createStore } from "redux";
import accessKey from "./accessKey";
import auth from "./auth";
import contests from "./contests";

import root from "./root";

const reducers = combineReducers({
  contests,
  auth,
  accessKey,
  root
});

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
