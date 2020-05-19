import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchTests, fetchTestImages } from "../../api";

export const SurveyStatistics = (props) => {
  const [tests, setTests] = useState([]);
  const [testImages, setTestImages] = useState([]);
  const [chosenTestId, setChosenTestId] = useState();

  useEffect(() => {
    fetchTests().then((tests) => {
      const testsWithKeys = tests.map((e) => ({ ...e, key: e.id }));
      setTests(testsWithKeys);
    });
    fetchTestImages().then((images) => {
      const imagesWithKeys = images.map((e) => ({ ...e, key: e.id }));
      setTestImages(imagesWithKeys);
    });
  }, []);

  function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  }

  function getTotalTime(testResults) {
    return testResults.reduce((sum, cur) => {
      return sum + cur.timeInSeconds;
    }, 0);
  }

  function getTestResultStatisticsByTestId(testId) {
    const neededTestResults = props.testResults.filter(
      (tr) => tr.test === testId
    );

    if (neededTestResults.length !== 0) {
      return (
        <div className="survey-stats-margin-top">
          <p>Количество прохождений всего: {props.testResults.length}</p>
          <p>
            Количество уникальных пройденных тестов:{" "}
            {Object.keys(groupBy(neededTestResults, "participantName")).length}
          </p>
          <p>
            Суммарное время, потраченное на все прохождения:{" "}
            {getTotalTime(neededTestResults)} сек.
          </p>
          <p>
            Среднее время, затрачиваемое на одно прохождение:{" "}
            {(
              getTotalTime(neededTestResults) / neededTestResults.length
            ).toFixed(2)}{" "}
            сек.
          </p>
        </div>
      );
    }
    return (
      <p className="survey-stats-margin-top">
        По выбранному опросу нет прохождений.
      </p>
    );
  }

  if (tests.length !== 0 && testImages.length !== 0)
    return (
      <div>
        <div className="list">
          {tests.map((test) => (
            <div
              className="list-test"
              onClick={() => {
                setChosenTestId(test.id);
              }}
            >
              <img
                className="list-image"
                src={testImages
                  .find((image) => image.test === test.id)
                  .image_file.replace("media", "static")}
              />
              <p className="list-title">{test.title}</p>
            </div>
          ))}
        </div>
        {chosenTestId && getTestResultStatisticsByTestId(chosenTestId)}
      </div>
    );
  return <p>loading..</p>;
};

export default SurveyStatistics;
