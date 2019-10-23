import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/auth";
import { saveAuth } from "../../../util/state/localStorageUtil";
import "./loginForm.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

function LoginForm(props) {
  const url = useSelector(state => state.root.url);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loginUser = async e => {
    e.preventDefault();
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line no-useless-escape
    if (!email || !re.test(String(email).toLowerCase())) {
      return setErrorMsg("Debe ingresar un email válido");
    }
    if (!password || password.length < 5) {
      return setErrorMsg(
        "Debe ingresar una contraseña de al menos 5 caracteres"
      );
    }

    try {
      const res = await axios.post(`${url}users/login`, { email, password });
      saveAuth(res.data);
      dispatch(setAuth(res.data));
      props.history.push("/schedule");
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  return (
    <form className="loginForm" noValidate onSubmit={loginUser}>
      <input
        type="email"
        placeholder="Correo"
        value={email.value}
        onChange={e => setEmail(e.target.value)}
        autoComplete="Email"
        className="loginForm__input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password.value}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
        className="loginForm__input"
      />
      {errorMsg ? <p className="loginForm__errorMsg">{errorMsg}</p> : null}
      <button
        className={`loginForm__button ${
          errorMsg ? "loginForm__button--error" : ""
        }`}
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  history: PropTypes.any
};

export default withRouter(LoginForm);
