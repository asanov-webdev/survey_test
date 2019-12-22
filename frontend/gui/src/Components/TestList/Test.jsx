import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  fetchQuestionsById,
  addQuestionToTest,
  destroyTest,
  destroyQuestion,
  updateTestTitle,
  updateQuestion
} from "../../api";
import { Card, Icon, Input } from "antd";
import useStateWithCallback from "use-state-with-callback";

export function Test(props) {
  const [questions, setQuestions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useStateWithCallback(
    {
      test: props.test.id
    },
    newQuestion => {
      if (newQuestion.positionInTest) {
        addQuestionToTest(newQuestion);
        setNewQuestion({ test: props.test.id });
      }
    }
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(-1);
  const [temporaryTitle, setTemporaryTitle] = useState(props.test.title);
  const [temporaryQuestionText, setTemporaryQuestionText] = useState("");
  const [temporaryQuestionPosition, setTemporaryQuestionPosition] = useState(
    -1
  );

  function addQuestion() {
    const lastQuestion = questions.reduce(function(prev, current) {
      return prev.positionInTest < current.positionInTest ? current : prev;
    });
    setNewQuestion({
      ...newQuestion,
      positionInTest: lastQuestion.positionInTest
    });
  }

  useEffect(() => {
    fetchQuestionsById(props.test.id).then(questions => {
      console.log(questions);
      const questionsWithKeys = questions.map(e => ({ ...e, key: e.id }));
      setQuestions(questionsWithKeys);
    });
  }, [props.test.id]);

  return (
    <div>
      <Card
        className="test-card"
        title={
          <div className="editing-card-title">
            {isEditingTitle ? (
              <Input
                className="title-input"
                value={temporaryTitle}
                onChange={event => setTemporaryTitle(event.target.value)}
              ></Input>
            ) : (
              <p>{props.test.title}</p>
            )}
            <span>
              {isEditingTitle ? (
                <span>
                  <Icon
                    type="check"
                    onClick={() => {
                      updateTestTitle(props.test, temporaryTitle);
                      setIsEditingTitle(false);
                    }}
                  />
                  <Icon
                    type="close"
                    onClick={() => {
                      setIsEditingTitle(false);
                    }}
                  />
                </span>
              ) : (
                <Icon
                  type="edit"
                  onClick={() => {
                    setIsEditingTitle(!isEditingTitle);
                  }}
                />
              )}
              <Icon
                type="delete"
                onClick={() => {
                  destroyTest(props.test);
                }}
              />
            </span>
          </div>
        }
      >
        {questions.map(question => (
          <Card
            title={
              <div className="editing-card-title">
                {editingQuestionId === question.id ? (
                  <span>
                    <Input
                      className="question-text-input"
                      value={temporaryQuestionText}
                      onChange={event =>
                        setTemporaryQuestionText(event.target.value)
                      }
                    />{" "}
                    <Input
                      className="question-position-input"
                      value={temporaryQuestionPosition}
                      onChange={event =>
                        setTemporaryQuestionPosition(event.target.value)
                      }
                    />
                  </span>
                ) : (
                  <p>{question.text}</p>
                )}
                <span>
                  {editingQuestionId === question.id ? (
                    <span>
                      <Icon
                        type="check"
                        onClick={() => {
                          updateQuestion(
                            question,
                            temporaryQuestionText,
                            temporaryQuestionPosition
                          );
                          setEditingQuestionId(-1);
                        }}
                      />
                      <Icon
                        type="close"
                        onClick={() => {
                          setEditingQuestionId(-1);
                        }}
                      />
                    </span>
                  ) : (
                    <Icon
                      type="edit"
                      onClick={() => {
                        setEditingQuestionId(
                          editingQuestionId === -1 ? question.id : -1
                        );
                        setTemporaryQuestionText(question.text);
                        setTemporaryQuestionPosition(question.positionInTest);
                      }}
                    />
                  )}
                  <Icon
                    type="delete"
                    onClick={() => {
                      destroyQuestion(question);
                    }}
                  />
                </span>
              </div>
            }
          >
            <Input placeholder="Введите ответ" onChange={() => {}} />
          </Card>
        ))}
        {isAdding && (
          <Card
            title={
              <Input
                className="new-question-title-input"
                placeholder="Текст вопроса"
                onChange={event => {
                  setNewQuestion({ ...newQuestion, text: event.target.value });
                }}
              />
            }
          >
            <Input placeholder="Введите ответ" onChange={() => {}} />
          </Card>
        )}
      </Card>
      <div className="action-panel">
        {isAdding ? (
          <span>
            <Icon
              className="accept-icon icon"
              type="check"
              onClick={() => {
                addQuestion();
                setIsAdding(false);
              }}
            />
            <Icon
              className="decline-icon icon"
              type="close"
              onClick={() => setIsAdding(false)}
            />
          </span>
        ) : (
          <Icon
            className="add-icon icon"
            type="plus-circle"
            onClick={() => setIsAdding(true)}
          />
        )}
      </div>
    </div>
  );
}
