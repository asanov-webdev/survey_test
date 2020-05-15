import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchUserTestResults } from "../../api";

export const Statistics = (props) => {
  const [testResults, setTestResults] = useState([]);

  function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  }

  useEffect(() => {
    fetchUserTestResults().then((testResults) => {
      const testResultsWithKeys = testResults.map((e) => ({ ...e, key: e.id }));
      setTestResults(testResultsWithKeys);
    });
  }, []);

  function getTotalTime() {
    return testResults.reduce((sum, cur) => {
      return sum + cur.timeInSeconds;
    }, 0);
  }

  if (testResults.length !== 0)
    return (
      <div>
        <p>Количество прохождений всего: {testResults.length}</p>
        <p>
          Количество уникальных пройденных тестов:{" "}
          {Object.keys(groupBy(testResults, "participantName")).length}
        </p>
        <p>
          Суммарное время, потраченное на все прохождения: {getTotalTime()} сек.
        </p>
        <p>
          Среднее время, затрачиваемое на одно прохождение:{" "}
          {(getTotalTime() / testResults.length).toFixed(2)} сек.
        </p>
      </div>
    );
  return <p>loading..</p>;
};

export default Statistics;
