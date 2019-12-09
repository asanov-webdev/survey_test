import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchQuestionsById, addQuestionToTest } from "../../api";
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
      const questionsWithKeys = questions.map(e => ({ ...e, key: e.id }));
      setQuestions(questionsWithKeys);
    });
  }, [props.test.id]);

  return (
    <div>
      <Card className="test-card" title={props.test.title}>
        {questions.map(question => (
          <Card title={question.text}>
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
