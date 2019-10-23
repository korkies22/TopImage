import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/login/Login";
import Index from "../pages/index/Index";
import Tutorial from "../pages/tutorial/Tutorial";
import "./App.css";

function AppRouter() {
  const token = useSelector(state => state.auth.token);
  return (
    <Router>
      <Route path="/" exact render={() => token?  <Index></Index>: <Redirect to="/login"/> } />
      <Route path="/login" render={() => token? <Redirect to="/"/> : <Login></Login> } />
      <Route path="/tutorial" component={Tutorial} />
      <Route path="*" render={() => <Redirect to="/"/> } />
    </Router>
  );
}

export default AppRouter;
