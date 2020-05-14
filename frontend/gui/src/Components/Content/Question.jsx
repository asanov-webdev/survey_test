import React, { useState, useEffect, useReducer } from "react";
import "./styles.css";
import {
  fetchQuestionImages,
  addTestResult,
  fetchTestResults,
  addQuestionAnswer,
} from "../../api";

export const Question = (props) => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const questions = props.questions;
  const [answerText, setAnswerText] = useState("");
  const [currentQuestionImages, setCurrentQuestionImages] = useState([]);
  const [passedTimeInSeconds, setPassedTimeInSeconds] = useState(0);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [hasFinished, setHasFinished] = useState(false);
  const [newTestResult, setNewTestResult] = useState({
    test: questions[0].test,
    participantName: localStorage.getItem("user"),
    timeInSeconds: passedTimeInSeconds,
    is_finished: true,
  });
  let [chosenVariants, dispatch] = useReducer(
    (chosenVariants, { type, value }) => {
      switch (type) {
        case "add":
          return [...chosenVariants, value];
        case "remove":
          return chosenVariants.filter((variant) => variant !== value);
        default:
          return chosenVariants;
      }
    },
    []
  );

  useEffect(() => {
    fetchQuestionImages(questions[currentQuestionNumber].id).then((response) =>
      setCurrentQuestionImages(response)
    );
  }, [currentQuestionNumber]);

  useEffect(() => {
    setTimeout(() => setPassedTimeInSeconds(passedTimeInSeconds + 1), 1000);
    setNewTestResult({ ...newTestResult, timeInSeconds: passedTimeInSeconds });
  }, [passedTimeInSeconds]);

  function addQuestionAnswerLocal() {
    const questionAnswer = {
      question: questions[currentQuestionNumber].id,
      value: answerText ? answerText : chosenVariants.toString(),
    };
    setQuestionAnswers([...questionAnswers, questionAnswer]);
  }

  function saveResult() {
    addTestResult(newTestResult).then(() =>
      fetchTestResults().then((testResults) => {
        const testResultId = testResults
          .filter(
            (testResult) =>
              testResult.participantName === newTestResult.participantName
          )
          .sort((result1, result2) => result2.id - result1.id)
          .pop().id;
        let answers = [];
        for (let i = 0; i < questionAnswers.length; i++) {
          answers.push({ ...questionAnswers[i], testResult: testResultId });
        }
        for (let i = 0; i < questionAnswers.length; i++) {
          addQuestionAnswer(answers[i]);
        }
      })
    );
    hasFinished && props.callback(true);
  }

  useEffect(() => {
    saveResult();
  }, [hasFinished]);

  return (
    <div>
      <button
        onClick={() => {
          currentQuestionNumber !== 0 &&
            setCurrentQuestionNumber(currentQuestionNumber - 1);
          setAnswerText("");
        }}
      >
        Предыдущий вопрос
      </button>{" "}
      {currentQuestionNumber === questions.length - 1 ? (
        <button
          onClick={() => {
            addQuestionAnswerLocal();
            setHasFinished(true);
          }}
        >
          Закончить
        </button>
      ) : (
        <button
          onClick={() => {
            currentQuestionNumber !== questions.length - 1 &&
              setCurrentQuestionNumber(currentQuestionNumber + 1);
            addQuestionAnswerLocal();
            setAnswerText("");
          }}
        >
          Следующий вопрос
        </button>
      )}
      <p>{questions[currentQuestionNumber].interrogation}</p>
      {currentQuestionImages.map((image) => (
        <div className="question-picture">
          <img src={image.image_file.replace("media", "static")} />
        </div>
      ))}
      {(questions[currentQuestionNumber].answerType === "TE" ||
        questions[currentQuestionNumber].answerType === "VA") && (
        <form>
          <input
            type="text"
            value={answerText}
            placeholder="Введите ответ..."
            onChange={(event) => {
              setAnswerText(event.target.value);
            }}
          />
        </form>
      )}
    </div>
  );
};

export default Question;
