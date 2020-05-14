import React from "react";
import { Header } from "../Header/Header";
import { Content } from "../Content/Content";
import { Sidebar } from "../Sidebar/Sidebar";
import "./styles.css";

export const MainPage = (props) => {
  return (
    <React.Fragment>
      <Header history={props.history} />
      <div className="subheader-block">
        <Sidebar />
        <Content />
      </div>
    </React.Fragment>
  );
};
