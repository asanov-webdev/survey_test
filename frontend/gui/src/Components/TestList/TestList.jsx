import React, { useState, useEffect } from "react";
import { fetchTests, addTest } from "../../api";
import { Button, Icon, Card, Input } from "antd";
import "./styles.css";
import { Test } from "./Test";

export function TestList() {
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newTest, setNewTest] = useState();
  const [newQuestions, setNewQuestions] = useState([
    {
      text: "",
      positionInTest: 1
    }
  ]);

  useEffect(() => {
    fetchTests().then(tests => {
      const testsWithKeys = tests.map(e => ({ ...e, key: e.id }));
      setTests(testsWithKeys);
    });
  }, []);

  return (
    <div>
      <div className="test-selector">
        {tests.map(test => (
          <Button
            className="test-select-button"
            type="primary"
            onClick={() => {
              setActiveTest(test);
              setIsAddingTest(false);
              setNewTest(null);
              setNewQuestions([
                {
                  text: "",
                  positionInTest: 1
                }
              ]);
            }}
          >
            {test.title}
          </Button>
        ))}
        <Icon
          className="add-icon icon"
          type="plus-circle"
          onClick={() => {
            setIsAddingTest(true);
            setActiveTest(null);
          }}
        />
      </div>
      {isAddingTest && (
        <Card
          className="test-card"
          title={
            <Input
              className="new-test-title-input"
              placeholder={"Название теста"}
              value={newTest && newTest.title ? newTest.title : null}
              onChange={event => {
                setNewTest({ ...newTest, title: event.target.value });
              }}
            />
          }
        >
          {newQuestions.map(newQuestion => (
            <Card title={"Новый вопрос " + newQuestion.positionInTest}>
              <Input
                placeholder="Текст вопроса"
                value={newQuestion && newQuestion.text && newQuestion.text}
                onChange={event => {
                  const index = newQuestions.findIndex(
                    question =>
                      question.positionInTest === newQuestion.positionInTest
                  );

                  let question = newQuestions[index];
                  question = { ...question, text: event.target.value };

                  const questions = [...newQuestions];
                  questions[index] = question;

                  setNewQuestions(questions);
                }}
              />
            </Card>
          ))}
        </Card>
      )}
      {isAddingTest && (
        <div className="action-panel">
          <span>
            <Icon
              className="add-icon icon"
              type="plus-circle"
              onClick={() => {
                const lastQuestion =
                  newQuestions.length !== 0 &&
                  newQuestions.reduce(function(prev, current) {
                    return prev.positionInTest < current.positionInTest
                      ? current
                      : prev;
                  });
                setNewQuestions([
                  ...newQuestions,
                  {
                    text: "",
                    positionInTest: lastQuestion
                      ? lastQuestion.positionInTest + 1
                      : 1
                  }
                ]);
              }}
            />
            {newQuestions.length !== 0 && (
              <Icon
                className="remove-icon icon"
                type="minus-circle"
                onClick={() => {
                  const lastQuestion = newQuestions.reduce(function(
                    prev,
                    current
                  ) {
                    return prev.positionInTest < current.positionInTest
                      ? current
                      : prev;
                  });
                  setNewQuestions(
                    newQuestions.filter(
                      newQuestion =>
                        newQuestion.positionInTest !==
                        lastQuestion.positionInTest
                    )
                  );
                }}
              />
            )}

            <Icon
              className="accept-icon icon"
              type="check"
              onClick={() => {
                setIsAddingQuestion(false);
              }}
            />
            <Icon
              className="decline-icon icon"
              type="close"
              onClick={() => {
                setNewTest(null);
                setNewQuestions([
                  {
                    text: "",
                    positionInTest: 1
                  }
                ]);
              }}
            />
          </span>
        </div>
      )}
      {activeTest && <Test test={activeTest} />}
    </div>
  );
}
