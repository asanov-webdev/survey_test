import React, { useState, useEffect } from "react";
import { fetchTests, fetchQuestionsById } from "../../api";
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

  useEffect(() => {
    if (isChoosingTest) {
      fetchTests().then(tests => {
        const testsWithKeys = tests.map(e => ({ ...e, key: e.id }));
        setTests(testsWithKeys);
      });
    } else {
      setTimeout(() => setPassedTimeInSeconds(passedTimeInSeconds + 1), 1000);
    }
  }, [isChoosingTest, passedTimeInSeconds]);

  function getQuestions(test) {
    fetchQuestionsById(test.id).then(questions => {
      const questionsWithKeys = questions.map(e => ({ ...e, key: e.id }));
      setQuestions(questionsWithKeys);
    });
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
            <Input className="name-input" placeholder="Введите имя"></Input>
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
                  }}
                />
              </Card>
            ))}
          </Card>
          <div className="end-test-button">
            <Button type="danger" onClick={() => {}}>
              Закончить тест
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
