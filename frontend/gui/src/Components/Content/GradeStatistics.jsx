import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchAllStudents } from "../../api";

export const GradeStatistics = (props) => {
  const [chosenGrade, setChosenGrade] = useState();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchAllStudents().then((students) => {
      const studentsWithKeys = students.map((e) => ({ ...e, key: e.id }));
      setStudents(studentsWithKeys);
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

  function getTestResultStatisticsByGrade(grade) {
    const neededTestResults = props.testResults.filter((tr) =>
      students.find(
        (student) =>
          student.login === tr.participantName && student.grade === grade
      )
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
      <p className="group-stats-margin-top">
        У выбранного курса нет прохождений.
      </p>
    );
  }

  if (students.length !== 0)
    return (
      <div>
        <div>
          {[...new Set(students.map((student) => student.grade))].map(
            (grade) => (
              <p
                className="student-group"
                onClick={() => {
                  setChosenGrade(grade);
                }}
              >
                {grade}
              </p>
            )
          )}
        </div>
        {chosenGrade && getTestResultStatisticsByGrade(chosenGrade)}
      </div>
    );
  return <p>loading..</p>;
};

export default GradeStatistics;
