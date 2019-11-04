import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/login/Login";
import Index from "../pages/home/Home";
import Contest from "../pages/contest/Contest";
import Tutorial from "../pages/tutorial/Tutorial";
import Nav from "../components/nav/Nav";
import "./App.css";

function AppRouter() {
  const token = useSelector(state => state.auth.token);
  console.log("TOKEN", token);
  return (
    <Router>
      {token ? <Nav /> : null}
      <Switch>
        <Route path="/tutorial" component={Tutorial} />
        <Route path="/" exact render={() => token ? <Index></Index> : <Redirect to="/login" />} />
        <Route path="/login" render={() => token ? <Redirect to="/" /> : <Login></Login>} />
        <Route path="/contests/:id" render={() => token ? <Contest></Contest> : <Redirect to="/login" />}/>
        <Route path="*" render={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
