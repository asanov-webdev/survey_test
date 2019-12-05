import React from "react";
import { Route } from "react-router-dom";
import { TestList } from "./Components/TestList/TestList";

export const BaseRouter = () => (
  <div>
    <Route exact path="/" component={TestList} />
  </div>
);
