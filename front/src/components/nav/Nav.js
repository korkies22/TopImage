/* eslint-disable no-undef */
import React, { useState } from "react";
import "./Nav.scss";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/auth";
import { logout as deleteUserInfo } from "../../util/state/localStorageUtil";

import { Link, NavLink } from "react-router-dom";

import PropTypes from "prop-types";

function Nav() {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    deleteUserInfo();
    dispatch(logoutAction());
  };

  return (
    <nav className={`nav ${isMobile ? "nav--active" : ""}`}>
      <div className="nav__header">
        <h1 className="nav__title">
          <Link className="nav__logo" to="/">
            TOP IMAGE
            <img
              className="nav__img"
              src={require("../../assets/icons/logo.svg")}
              alt="App logo. A lightbulb inside an icon"
            />
          </Link>
        </h1>
        <button
          className="nav__toggle"
          onClick={() => {
            setIsMobile(!isMobile);
          }}
        >
          <img
            src={require("../../assets/icons/menu.svg")}
            alt="Toggler for menu when on mobile"
          ></img>
        </button>
      </div>
      <div className={`${isMobile ? "nav__actions--active" : "nav__actions"}`}>
        <div className="nav__action">
          <NavLink
            exact={true}
            className="nav__link"
            activeClassName="nav__link--active"
            to="/"
          >
            Home
          </NavLink>
        </div>

        <div className="nav__user">
          <NavLink
            exact={true}
            className="nav__link"
            activeClassName="nav__link--active"
            to="/tutorial"
          >
            {" "}
            <img
              className="nav__userIcon"
              src={require("../../assets/icons/help.svg")}
              alt="help"
            />
          </NavLink>
          <img
            className="nav__userIcon"
            src={require("../../assets/icons/person.svg")}
            alt="user"
            onClick={() => setUserModalOpen(!isUserModalOpen)}
          />
        </div>
        <div className="nav__user--responsive">
          <div className="nav__action">
            <NavLink
              exact={true}
              className="nav__link"
              activeClassName="nav__link--active"
              to="/tutorial"
            >
              Tutorial
            </NavLink>
          </div>
          <div className="nav__action">
            <button onClick={logout} className="nav__mockLink">
              Log Out
            </button>
          </div>
        </div>
      </div>

      {isUserModalOpen ? (
        <div className="nav__modal">
          <p className="nav__modalOption" onClick={logout}>
            Cerrar sesión
          </p>
        </div>
      ) : null}
    </nav>
  );
}

Nav.propTypes = {
  history: PropTypes.any,
};

export default Nav;
