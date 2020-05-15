import React, { useState, useEffect } from "react";
import "./styles.css";
import { TestList } from "./TestList";
import { Test } from "./Test";
import { Statistics } from "./Statistics";

export const Content = (props) => {
  const [testId, setTestId] = useState();

  const idCallback = (testId) => {
    setTestId(testId);
  };

  return (
    <div className="content">
      {props.tab.statistics ? (
        <Statistics />
      ) : (
        <div>
          {testId ? (
            <Test id={testId} callback={idCallback} />
          ) : (
            <TestList callback={idCallback} />
          )}
        </div>
      )}
    </div>
  );
};
