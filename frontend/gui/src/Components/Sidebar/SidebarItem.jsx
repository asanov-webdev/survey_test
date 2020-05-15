import React from "react";
import "./styles.css";
import expand from "../../assets/images/expand.svg";

export const SidebarItem = (props) => {
  return (
    <div
      className="sidebar-item"
      onClick={() => {
        switch (props.title) {
          case "Опросы":
            props.callback({ surveys: true, statistics: false });
            break;
          case "Статистика":
            props.callback({ surveys: false, statistics: true });
            break;
          default:
            props.callback({ surveys: true, statistics: false });
        }
      }}
    >
      {/* <img className="icon" src={props.icon} alt=''/> */}
      <div className="title">{props.title}</div>
      {/* <img className="more" src={expand} /> */}
    </div>
  );
};
