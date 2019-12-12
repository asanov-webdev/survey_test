import React from "react";
import { Route } from "react-router-dom";
import { TestList } from "./Components/TestList/TestList";
import { TestPassing } from "./Components/TestPassing/TestPassing";

export const BaseRouter = () => (
  <div>
    <Route exact path="/editing" component={TestList} />
    <Route path="/passing" component={TestPassing} />
  </div>
);
