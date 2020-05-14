import React from "react";
import "./styles.css";
import menu from "../../assets/images/menu_colored.png";
import user from "../../assets/images/user_colored.png";
import { Link } from "react-router-dom";

export const Header = (props) => {
  function exitUser() {
    localStorage.removeItem("user");
    props.history.push("/");
  }

  function checkAuthorization() {
    const user = localStorage.getItem("user");
    if (user)
      return (
        <div className="block">
          <div className="phrase">{user}</div>
          <div
            className="phrase exit"
            onClick={() => {
              exitUser();
            }}
          >
            Выйти
          </div>
        </div>
      );
    return (
      // <div className="block">
      //   <Link to={`/login`}>
      //     <div className="phrase login">Войти</div>{" "}
      //   </Link>
      // </div>
      <div className="block">
        {/* <div className="phrase">Пользователь: {user}</div> */}
        <Link to={`/login`}>
          <div className="phrase exit">Войти</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="header">
      <div className="block">
        {/* <img src={menu} className="icon icon-1" /> */}
        <Link to={`/`}>
          <div className="phrase">Курсач</div>
        </Link>
      </div>
      {/* <div className="block">
        <div className="phrase">Пройти опрос</div>
        <div className="phrase">Результаты</div>
      </div> */}
      {checkAuthorization()}
    </div>
  );
};
