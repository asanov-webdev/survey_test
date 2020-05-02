import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="page-block">
      <div className="login-block">
        <div className="title">Войти</div>
        <div className="input-block">
          <input placeholder="Введите логин" />
          <input placeholder="Введите пароль" />
        </div>{" "}
        <Link to={`/register`}>
          <div className="register">Регистрация</div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
