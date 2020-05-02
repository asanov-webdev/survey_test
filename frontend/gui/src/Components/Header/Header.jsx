import React from "react";
import "./styles.css";
import menu from "../../assets/images/menu_colored.png";
import user from "../../assets/images/user_colored.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header">
      <div className="block">
        <img src={menu} className="icon icon-1" />
        <div className="phrase">Курсач</div>
      </div>
      <div className="block">
        <div className="phrase">Пройти опрос</div>
        <div className="phrase">Результаты</div>
        <Link to={`/login`}>
          <img src={user} className="icon icon-2" />
        </Link>
      </div>
    </div>
  );
};
