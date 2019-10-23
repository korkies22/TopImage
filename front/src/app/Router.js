import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/login/Login";
import Schedule from "../pages/schedule/Schedule";
import Tutorial from "../pages/tutorial/Tutorial";
import "./App.css";

function AppRouter() {
  const token = useSelector(state => state.auth.token);
  return (
    <Router>
      <Route path="/" exact component={Tutorial} />
      <Route path="/login" render={() => token? <Redirect to="/schedule"/> : <Login></Login> } />
      <Route path="/schedule" render={() => token?  <Schedule></Schedule>: <Redirect to="/login"/> } />
      <Route path="*" render={() => <Redirect to="/"/> } />
    </Router>
  );
}

export default AppRouter;
