import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BaseRouter } from "./router";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <BaseRouter />
    </Router>
  );
}

export default App;
