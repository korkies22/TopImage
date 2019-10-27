/* eslint-disable no-undef */
import React, { useState } from "react";
import "./Nav.scss";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/auth";
import { logout as deleteUserInfo } from "../../util/state/localStorageUtil";


import {
  NavLink
} from "react-router-dom";

import PropTypes from "prop-types";

function Nav(props) {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    deleteUserInfo();
    dispatch(logoutAction());
  };

  return (
    <div className="nav">
      <h2 className="nav__logo">TOP IMAGE</h2>
      <div className="nav__actions">
        <NavLink exact={true} className="nav__link" activeClassName='nav__link--active' to="/">Home</NavLink>
        <NavLink exact={true} className="nav__link" activeClassName='nav__link--active' to="/search">Search</NavLink>
        
        <div className="nav__user">
          <a href='/' target="_blank"> <img className="nav__userIcon" src={require("../../assets/icons/help.svg")} alt="help"/></a>
          <img
            className="nav__userIcon"
            src={require("../../assets/icons/person.svg")}
            alt="user"
            onClick={() => setUserModalOpen(!isUserModalOpen)}
          />
        </div>
      </div>

      {isUserModalOpen ? (
        <div className="nav__modal">
          <p className="nav__modalOption" onClick={logout}>
            Cerrar sesión
          </p>
        </div>
      ) : null}
    </div>
  );
}


Nav.propTypes = {
  history: PropTypes.any
};

export default Nav;
