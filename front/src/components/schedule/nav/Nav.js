/* eslint-disable no-undef */
import React, { useState } from "react";
import "./Nav.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../../store/auth";
import { setMonday,setActCurMonday } from "../../../store/week";
import { logout as deleteUserInfo } from "../../../util/state/localStorageUtil";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

function Nav(props) {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const dispatch = useDispatch();
  const curMonday = useSelector(state => state.week.curMonday);

  const logout = () => {
    deleteUserInfo();
    dispatch(logoutAction());
    props.history.push("/login");
  };

  const changeMonday = (howMuch) => {
    const newDate = new Date(curMonday.getTime() + 60 * 60 * 24 * 7 * 1000 * howMuch);
    dispatch(setMonday(newDate));
    dispatch(setActCurMonday(newDate));
  };

  const getMondayFormatted = () =>{
    const monday=new Date(curMonday);
    let locale= "es-CO";
    let month= monday.toLocaleString(locale, { month: "long" });
    month=month.charAt(0).toUpperCase() + month.slice(1);
    return month + " "+ monday.getDate();
  };

  const getSaturdayFormatted = () =>{
    const saturday=new Date(curMonday);
    saturday.setDate(saturday.getDate() + 6);
    let locale= "es-CO";
    let month= saturday.toLocaleString(locale, { month: "long" });
    month=month.charAt(0).toUpperCase() + month.slice(1);
    return month + " "+ saturday.getDate();
  };

  return (
    <div className="nav" key={curMonday.getDate()}>
      <h2 className="nav__logo">Academical</h2>
      <div className="nav__dates">
        <h3 className="nav__date nav__date--1" onClick={()=>changeMonday(-1)}>&lt;</h3>
        <h3 className="nav__date nav__date--2">{getMondayFormatted()} - {getSaturdayFormatted()}</h3>
        <h3 className="nav__date nav__date--3" onClick={()=>changeMonday(1)}>&gt;</h3>
      </div>
      <div className="nav__user">
        <a href='/' target="_blank"> <img className="nav__userIcon" src={require("../../../assets/icons/help.svg")} alt="help"/></a>
        <img
          className="nav__userIcon"
          src={require("../../../assets/icons/person.svg")}
          alt="user"
          onClick={() => setUserModalOpen(!isUserModalOpen)}
        />
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

export default withRouter(Nav);
