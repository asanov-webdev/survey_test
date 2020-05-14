import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchQuestionsById } from "../../api";
import { Question } from "./Question";

export const Test = (props) => {
  const [questions, setQuestions] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);

  const finishedCallback = (flag) => {
    setTestFinished(flag);
  };

  useEffect(() => {
    fetchQuestionsById(props.id).then((response) => setQuestions(response));
  }, []);

  testFinished && props.callback(null);

  return (
    <div>
      {testStarted ? (
        <Question questions={questions} callback={finishedCallback} />
      ) : (
        <div>
          <button
            className="back-button"
            onClick={() => {
              props.callback(null);
            }}
          >
            Назад
          </button>{" "}
          <button
            className="start-button"
            onClick={() => {
              setTestStarted(true);
            }}
          >
            Начать
          </button>
        </div>
      )}
    </div>
  );
};

export default Test;
