import React, { useState } from "react";
import "./login.scss";
import LoginForm from "../../components/login/loginForm/loginForm";
import SignUpForm from "../../components/login/signUpForm/signUpForm";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage__title">Academical</h1>
      {isLogin ? <LoginForm></LoginForm> : <SignUpForm></SignUpForm>}
      <p>
        {isLogin ? "¿Eres nuevo?" : "Ya te uniste?"}{" "}
        <span
          className="loginPage__butSwitch"
          onClick={toggleIsLogin.bind(null)}
        >
          {isLogin ? "Regístrate" : "Inicia Sesion"}
        </span>
      </p>
      <p>¿Perdido? Consulta nuestro <a href='/' target="_blank" className="loginPage__butSwitch">Tutorial</a></p>
    </div>
  );
}

export default Login;
