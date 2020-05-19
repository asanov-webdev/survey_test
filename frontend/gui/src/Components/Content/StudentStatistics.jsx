import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchAllStudents } from "../../api";

export const StudentStatistics = (props) => {
  const [chosenStudentLogin, setChosenStudentLogin] = useState();
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

  function getTestResultStatisticsByParticipantLogin(login) {
    const neededTestResults = props.testResults.filter(
      (tr) => tr.participantName === login
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
        У выбранного студента нет прохождений.
      </p>
    );
  }

  if (students.length !== 0)
    return (
      <div>
        <div>
          {students.map((student) => (
            <p
              className="student-login"
              onClick={() => {
                setChosenStudentLogin(student.login);
              }}
            >
              {student.login}
            </p>
          ))}
        </div>
        {chosenStudentLogin &&
          getTestResultStatisticsByParticipantLogin(chosenStudentLogin)}
      </div>
    );
  return <p>loading..</p>;
};

export default StudentStatistics;
