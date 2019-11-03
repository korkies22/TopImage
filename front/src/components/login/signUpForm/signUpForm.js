import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/auth";
import { saveAuth } from "../../../util/state/localStorageUtil";
import "./signUpForm.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";

function SignUpForm(props) {
  const url = useSelector(state => state.root.url);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const signUpUser = async e => {
    e.preventDefault();
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line no-useless-escape
    if (!email || !re.test(String(email).toLowerCase())) {
      return setErrorMsg("You have to use a valid email");
    }
    if (!password || password.length < 5) {
      return setErrorMsg("The password must have at least 5 characters");
    }
    if (confirmPassword !== password) {
      return setErrorMsg("Las contraseñas deben coincidir");
    }

    try {
      const res = await axios.post(`${url}users/signup`, { email, password });
      saveAuth(res.data);
      dispatch(setAuth(res.data));
      props.history.push("/");
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  return (
    <form className="signUpForm" noValidate onSubmit={signUpUser}>
      <input
        type="email"
        id="email"
        name="email"
        aria-label="email"
        placeholder="Email"
        value={email.value}
        onChange={e => setEmail(e.target.value)}
        autoComplete="Email"
        className="signUpForm__input"
      />
      <input
        type="password"
        id="password"
        aria-label="password"
        placeholder="Password"
        value={password.value}
        onChange={e => setPassword(e.target.value)}
        autoComplete="new-password"
        className="signUpForm__input"
      />
      <input
        id="confirmPassword"
        type="password"
        aria-label="ConfirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword.value}
        onChange={e => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
        className="signUpForm__input"
      />
      {errorMsg ? <p className="signUpForm__errorMsg">{errorMsg}</p> : null}
      <button
        className={`signUpForm__button ${
          errorMsg ? "signUpForm__button--error" : ""
        }`}
        type="submit"
      >
        SignUp
      </button>
    </form>
  );
}

SignUpForm.propTypes = {
  history: PropTypes.any,
};

export default withRouter(SignUpForm);
