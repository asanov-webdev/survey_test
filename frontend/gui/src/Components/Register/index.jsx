import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="page-block">
      <div className="register-block">
        <div className="title">Регистрация</div>
        <div className="input-block">
          <input placeholder="Введите имя" />
          <input placeholder="Введите логин" />
          <input placeholder="Введите пароль" />
          <div className="radios">
            <div className="radio-1">
              <input
                className="radio"
                type="radio"
                id="statusChoice1"
                name="status"
                value="student"
              />
              <label for="statusChoice1">Студент</label>
            </div>
            <div className="radio-2">
              <input
                className="radio"
                type="radio"
                id="statusChoice2"
                name="status"
                value="worker"
              />
              <label for="statusChoice2">Сотрудник</label>
            </div>
          </div>
        </div>
        <Link to={`/login`}>
          <div className="login">Войти</div>
        </Link>
      </div>
    </div>
  );
};

export default Register;
