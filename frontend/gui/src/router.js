import React from "react";
import { Route } from "react-router-dom";
import { TestList } from "./components/TestList/TestList";
import { TestPassing } from "./components/TestPassing/TestPassing";
import { MainPage } from "./components/MainPage/MainPage";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export const BaseRouter = () => (
  <div>
    <Route exact path="/" component={MainPage} />
    <Route path="/editing" component={TestList} />
    <Route path="/passing" component={TestPassing} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </div>
);
