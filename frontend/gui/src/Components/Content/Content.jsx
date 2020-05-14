import React, { useState, useEffect } from "react";
import "./styles.css";
import { TestList } from "./TestList";
import { Test } from "./Test";

export const Content = (props) => {
  const [testId, setTestId] = useState();

  const idCallback = (testId) => {
    setTestId(testId);
  };

  return (
    <div className="content">
      {testId ? (
        <Test id={testId} callback={idCallback} />
      ) : (
        <TestList callback={idCallback} />
      )}
    </div>
  );
};
