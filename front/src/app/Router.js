import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/login/Login";
import Index from "../pages/home/Home";
import Tutorial from "../pages/tutorial/Tutorial";
import Nav from "../components/nav/Nav";
import "./App.css";

function AppRouter() {
  const token = useSelector(state => state.auth.token);
  return (
    <Router>
      {token?<Nav/>:<Redirect to="/login"/>}
      <Route path="/" exact render={() => token?  <Index></Index>: <Redirect to="/login"/> } />
      <Route path="/login" render={() => token? <Redirect to="/"/> : <Login></Login> } />
      <Route path="/tutorial" component={Tutorial} />
      <Route path="/search" component={Tutorial} />
      <Route path="*" render={() => <Redirect to="/"/> } />
    </Router>
  );
}

export default AppRouter;
