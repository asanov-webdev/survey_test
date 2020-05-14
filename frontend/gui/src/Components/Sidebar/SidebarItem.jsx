import React from "react";
import "./styles.css";
import expand from '../../assets/images/expand.svg';

export const SidebarItem = (props) => {
  return (
    <div className="sidebar-item">
      {/* <img className="icon" src={props.icon} alt=''/> */}
      <div className="title">{props.title}</div>
      {/* <img className="more" src={expand} /> */}
    </div>
  );
};
