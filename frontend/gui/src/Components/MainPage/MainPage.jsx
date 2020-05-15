import React, { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Content } from "../Content/Content";
import { Sidebar } from "../Sidebar/Sidebar";
import "./styles.css";

export const MainPage = (props) => {
  const [tab, setTab] = useState({
    surveys: true,
    statistics: false,
  });

  const tabCallback = (object) => {
    setTab(object);
  };

  return (
    <React.Fragment>
      <Header history={props.history} />
      <div className="subheader-block">
        <Sidebar callback={tabCallback} />
        <Content tab={tab} />
      </div>
    </React.Fragment>
  );
};
