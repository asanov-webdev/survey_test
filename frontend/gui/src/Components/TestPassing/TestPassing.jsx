import React, { useState, useEffect, useReducer } from "react";
import {
  fetchTests,
  fetchQuestionsById,
  addTestResult,
  addQuestionAnswer,
  fetchTestResults,
  fetchQuestionImages,
  fetchQuestionAnswerVariants
} from "../../api";
import { Button, Progress, Card, Input } from "antd";
import "./styles.css";
import useStateWithCallback from "use-state-with-callback";

export function TestPassing() {
  const [isChoosingTest, setIsChoosingTest] = useState(true);
  const [tests, setTests] = useState([]);
  const [chosenTest, setChosenTest] = useState();
  const [passedTimeInSeconds, setPassedTimeInSeconds] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [progressInPercents, setProgressInPercents] = useStateWithCallback(
    0,
    () => {
      setProgressInPercents((progressInAmount / questionsAmount) * 100);
    }
  );
  const [progressInAmount, setProgressInAmount] = useState(0);
  const [filledInputs, setFilledInputs] = useStateWithCallback([], () => {
    setProgressInAmount(filledInputs.length);
  });
  const questionsAmount = questions.length;
  const [newTestResult, setNewTestResult] = useState();
  const [newAnswers, setNewAnswers] = useState([]);
  const [hasFinished, setHasFinished] = useState(false);
  const [currentQuestionImages, setCurrentQuestionImages] = useState([]);
  const [
    currentQuestionAnswerVariants,
    setCurrentQuestionAnswerVariants
  ] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState();
  let [chosenVariants, dispatch] = useReducer(
    (chosenVariants, { type, value }) => {
      switch (type) {
        case "add":
          return [...chosenVariants, value];
        case "remove":
          return chosenVariants.filter(variant => variant !== value);
        default:
          return chosenVariants;
      }
    },
    []
  );
  const [answerText, setAnswerText] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState([]);

  useEffect(() => {
    if (isChoosingTest) {
      fetchTests().then(tests => {
        const testsWithKeys = tests.map(e => ({ ...e, key: e.id }));
        setTests(testsWithKeys);
      });
    } else if (!hasFinished) {
      setTimeout(() => setPassedTimeInSeconds(passedTimeInSeconds + 1), 1000);
      setNewTestResult({
        ...newTestResult,
        timeInSeconds: passedTimeInSeconds + 1
      });
    }
  }, [isChoosingTest, passedTimeInSeconds]);

  useEffect(() => {
    setCurrentQuestion(
      questions.find(
        question => question.positionInTest === currentQuestionNumber
      )
    );
  });

  useEffect(() => {
    if (currentQuestion !== undefined) {
      fetchQuestionImages(currentQuestion.id).then(response =>
        setCurrentQuestionImages(response)
      );
      fetchQuestionAnswerVariants(currentQuestion.id).then(response =>
        setCurrentQuestionAnswerVariants(response)
      );
    }
  }, [currentQuestion]);

  function getQuestions(test) {
    fetchQuestionsById(test.id).then(questions => {
      const questionsWithKeys = questions.map(e => ({ ...e, key: e.id }));
      setQuestions(questionsWithKeys);
      console.log("got them!");
    });
  }

  function saveResult() {
    addTestResult(newTestResult).then(() =>
      fetchTestResults().then(testResults => {
        console.log(testResults);
        console.log(newTestResult);
        const testResultId = testResults
          .filter(
            testResult =>
              testResult.participantName === newTestResult.participantName
          )
          .sort(
            (result1, result2) =>
              result2.finishTime.getSeconds() - result1.finishTime.getSeconds()
          )
          .pop().id;
        let answers = [];
        console.log(questionAnswers);
        for (let i = 0; i < questionAnswers.length; i++) {
          answers.push({ ...questionAnswers[i], testResult: testResultId });
        }
        for (let i = 0; i < questionAnswers.length; i++) {
          addQuestionAnswer(answers[i]);
        }
      })
    );
  }

  useEffect(() => {
    saveResult();
  }, [hasFinished]);

  function handleInputChange(event, question) {
    const index = newAnswers.findIndex(
      answer => answer.question === question.id
    );

    let answer = index !== -1 ? newAnswers[index] : { question: question.id };
    answer = { ...answer, answerText: event.target.value };

    if (index !== -1) {
      console.log(index);
      console.log("index");
      const answers = [...newAnswers];
      answers[index] = answer;
      setNewAnswers(answers);
    } else {
      console.log("not index");
      setNewAnswers([...newAnswers, answer]);
    }
  }

  return (
    <div>
      {isChoosingTest ? (
        <div>
          <div className="test-selector">
            {tests.map(test => (
              <Button
                className="test-select-button"
                type="primary"
                onClick={() => setChosenTest(test)}
              >
                {test.title}
              </Button>
            ))}
          </div>

          {chosenTest && (
            <div className="start-test-button">
              <Button
                type="danger"
                onClick={() => {
                  setIsChoosingTest(false);
                  setNewTestResult({ test: chosenTest.id });
                  getQuestions(chosenTest);
                }}
              >
                Начать тест {chosenTest.title}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Progress percent={progressInPercents} />
          <div className="info-block">
            <p>Участник: </p>
            <Input
              className="name-input"
              placeholder="Введите имя"
              onChange={event => {
                setNewTestResult({
                  ...newTestResult,
                  participantName: event.target.value
                });
              }}
            ></Input>
            <p className="passed-time">
              Прошло времени: {passedTimeInSeconds} сек.
            </p>
          </div>
          {questions.length === 0 || currentQuestion === undefined ? (
            <p>loading...</p>
          ) : (
            <div className="test-wrapper">
              <div className="test-question">
                <div className="question-text">
                  <p>{currentQuestion.text}</p>
                </div>
                {currentQuestionImages.map(image => (
                  <div className="question-picture">
                    <img src={image.image_file.replace("media", "static")} />
                  </div>
                ))}
                <div className="question-interrogation">
                  {currentQuestion.interrogation}
                </div>
                {currentQuestion.answerType === "CH" && (
                  <form>
                    {currentQuestionAnswerVariants.map(
                      (answerVariant, index) => {
                        return (
                          <div className="question-answer-variant">
                            <label>
                              <input
                                type="radio"
                                value={answerVariant.value}
                                checked={chosenVariants.includes(index)}
                                onClick={() =>
                                  chosenVariants.includes(index)
                                    ? dispatch({
                                        type: "remove",
                                        value: index
                                      })
                                    : dispatch({
                                        type: "add",
                                        value: index
                                      })
                                }
                                // name="answer-radio"
                              />
                              {answerVariant.value}
                            </label>
                          </div>
                        );
                      }
                    )}
                  </form>
                )}
                {(currentQuestion.answerType === "TE" ||
                  currentQuestion.answerType === "VA") && (
                  <form>
                    <input
                      type="text"
                      value={answerText}
                      placeholder="Введите ответ..."
                      onChange={event => {
                        setAnswerText(event.target.value);
                      }}
                    />
                  </form>
                )}
                {currentQuestionNumber !== questions.length && (
                  <Button
                    type="primary"
                    onClick={() => {
                      const questionAnswer = {
                        question: currentQuestion.id,
                        value: answerText
                          ? answerText
                          : chosenVariants.toString()
                      };
                      setQuestionAnswers([...questionAnswers, questionAnswer]);
                      setCurrentQuestionNumber(currentQuestionNumber + 1);
                      console.log(chosenVariants);
                      chosenVariants = [];
                      setAnswerText('');
                      console.log(chosenVariants);
                    }}
                  >
                    Следующий вопрос
                  </Button>
                )}
              </div>
            </div>
          )}

          {currentQuestionNumber === questions.length && (
            <div className="end-test-button">
              <Button
                type="danger"
                onClick={() => {
                  const questionAnswer = {
                    question: currentQuestion.id,
                    value: answerText ? answerText : chosenVariants.toString()
                  };
                  console.log(answerText);
                  console.log(chosenVariants);
                  setQuestionAnswers([...questionAnswers, questionAnswer]);
                  setHasFinished(true);
                }}
              >
                Закончить тест
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
