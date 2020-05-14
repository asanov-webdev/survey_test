import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { loginModuleUser } from "../../api";

export const Login = (props) => {
  const [loginUser, setLoginUser] = useState({
    login: "",
    password: "",
  });

  function tryLogin() {
    const loginIsSuccessful = loginModuleUser(loginUser);
    if (loginIsSuccessful) {
      localStorage.setItem("user", loginUser.login);
      props.history.push("/");
    }
  }

  return (
    <div className="page-block">
      <div className="login-block">
        <div className="title">Войти</div>
        <div className="input-block">
          <input
            placeholder="Введите логин"
            value={loginUser.login}
            onChange={(event) => {
              setLoginUser({ ...loginUser, login: event.target.value });
            }}
          />
          <input
            placeholder="Введите пароль"
            value={loginUser.password}
            type='password'
            onChange={(event) => {
              setLoginUser({ ...loginUser, password: event.target.value });
            }}
          />
        </div>{" "}
        <Link to={`/register`}>
          <div className="register">Регистрация</div>
        </Link>
        <div className="confirm-block">
          <button
            className="confirm-button"
            onClick={() => {
              tryLogin();
            }}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
