import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { registerModuleUser } from "../../api";

export const Register = () => {
  const [newModuleUser, setNewModuleUser] = useState({
    name: "",
    login: "",
    password: "",
    status: "1",
  });

  return (
    <div className="page-block">
      <div className="register-block">
        <div className="title">Регистрация</div>
        <div className="input-block">
          <input
            placeholder="Введите имя"
            value={newModuleUser.name}
            onChange={(event) => {
              setNewModuleUser({ ...newModuleUser, name: event.target.value });
            }}
          />
          <input
            placeholder="Введите логин"
            value={newModuleUser.login}
            onChange={(event) => {
              setNewModuleUser({ ...newModuleUser, login: event.target.value });
            }}
          />
          <input
            placeholder="Введите пароль"
            type="password"
            value={newModuleUser.password}
            onChange={(event) => {
              setNewModuleUser({
                ...newModuleUser,
                password: event.target.value,
              });
            }}
          />
          <div className="radios">
            <div className="radio-1">
              <input
                className="radio"
                type="radio"
                id="statusChoice1"
                name="status"
                value="1"
                checked={true}
                onChange={(event) => {
                  setNewModuleUser({
                    ...newModuleUser,
                    status: event.target.value,
                  });
                }}
              />
              <label for="statusChoice1">Студент</label>
            </div>
            <div className="radio-2">
              <input
                className="radio"
                type="radio"
                id="statusChoice2"
                name="status"
                value="2"
                onChange={(event) => {
                  setNewModuleUser({
                    ...newModuleUser,
                    status: event.target.value,
                  });
                }}
              />
              <label for="statusChoice2">Сотрудник</label>
            </div>
          </div>
        </div>
        <div className="confirm-block">
          <button
            className="confirm-button"
            onClick={() => {
              registerModuleUser(newModuleUser);
            }}
          >
            Подтвердить
          </button>
        </div>
        <Link to={`/login`}>
          <div className="login">Войти</div>
        </Link>
      </div>
    </div>
  );
};

export default Register;
