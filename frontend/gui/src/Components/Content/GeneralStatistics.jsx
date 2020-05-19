import React from "react";
import "./styles.css";

export const GeneralStatistics = (props) => {
  function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  }

  function getTotalTime() {
    return props.testResults.reduce((sum, cur) => {
      return sum + cur.timeInSeconds;
    }, 0);
  }

  if (props.testResults.length !== 0)
    return (
      <div>
        <p>Количество прохождений всего: {props.testResults.length}</p>
        <p>
          Количество уникальных пройденных тестов:{" "}
          {Object.keys(groupBy(props.testResults, "participantName")).length}
        </p>
        <p>
          Суммарное время, потраченное на все прохождения: {getTotalTime()} сек.
        </p>
        <p>
          Среднее время, затрачиваемое на одно прохождение:{" "}
          {(getTotalTime() / props.testResults.length).toFixed(2)} сек.
        </p>
      </div>
    );
  return <p>loading..</p>;
};

export default GeneralStatistics;
