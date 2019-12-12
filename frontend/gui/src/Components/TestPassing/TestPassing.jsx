import React, { useState, useEffect } from "react";
import {
  fetchTests,
  fetchQuestionsById,
  addTestResult,
  addQuestionAnswer,
  fetchTestResults
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

  function getQuestions(test) {
    fetchQuestionsById(test.id).then(questions => {
      const questionsWithKeys = questions.map(e => ({ ...e, key: e.id }));
      setQuestions(questionsWithKeys);
    });
  }

  function saveResult() {
    console.log(newAnswers);

    addTestResult(newTestResult);

    fetchTestResults().then(testResults => {
      console.log(testResults);
      console.log(newTestResult);
      const testResultId = testResults.find(
        testResult =>
          testResult.participantName === newTestResult.participantName
      ).id;
      let answers = [];
      for (let i = 0; i < newAnswers.length; i++) {
        answers.push({ ...newAnswers[i], testResult: testResultId });
      }
      for (let i = 0; i < newAnswers.length; i++) {
        addQuestionAnswer(answers[i]);
      }
    });
  }

  function handleInputChange(event, question) {
    const index = newAnswers.findIndex(
      answer => answer.question === question.id
    );

    let answer = (index !== -1) ? newAnswers[index] : { question: question.id };
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
          <Card className="test-card" title={chosenTest.title}>
            {questions.map(question => (
              <Card title={question.text}>
                <Input
                  placeholder="Введите ответ"
                  onChange={event => {
                    const value = event.target.value;
                    if (value !== "" && !filledInputs.includes(question.id)) {
                      setFilledInputs([...filledInputs, question.id]);
                    }
                    if (value === "" && filledInputs.includes(question.id)) {
                      const newFilledInputs = filledInputs.filter(
                        filledInput => filledInput !== question.id
                      );
                      setFilledInputs(newFilledInputs);
                    }
                    handleInputChange(event, question);
                  }}
                />
              </Card>
            ))}
          </Card>
          <div className="end-test-button">
            <Button
              type="danger"
              onClick={() => {
                setHasFinished(true);
                saveResult();
              }}
            >
              Закончить тест
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
