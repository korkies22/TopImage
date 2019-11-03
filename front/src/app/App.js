import React from "react";
import { Provider } from "react-redux";
import store from "../store/mainStore";
import "./App.css";

import Main from "./Main";

function AppRouter() {


  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

export default AppRouter;
