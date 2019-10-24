import React, { useState } from 'react';
import './login.scss';
import LoginForm from '../../components/login/loginForm/loginForm';
import SignUpForm from '../../components/login/signUpForm/signUpForm';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="loginPage">
      <div className="loginPage__container">
        <h1 className="loginPage__title">Top</h1>
        {isLogin ? <LoginForm></LoginForm> : <SignUpForm></SignUpForm>}
        <p>
          {isLogin ? 'Are you new?' : 'Have you joined?'}{' '}
          <span
            className="loginPage__butSwitch"
            onClick={toggleIsLogin.bind(null)}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
        <p>
          Lost? Check out the tutorial{' '}
          <a href="/" target="_blank" className="loginPage__butSwitch">
            Tutorial
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
