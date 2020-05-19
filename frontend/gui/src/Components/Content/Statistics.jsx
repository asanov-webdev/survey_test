import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchUserTestResults } from "../../api";
import GeneralStatistics from "./GeneralStatistics";
import SurveyStatistics from "./SurveyStatistics";
import StudentStatistics from "./StudentStatistics";
import GroupStatistics from "./GroupStatistics";
import GradeStatistics from "./GradeStatistics";
import { StyledStatisticsTypeButton } from "./styles";

export const Statistics = (props) => {
  const [testResults, setTestResults] = useState([]);
  const [statisticsType, setStatisticsType] = useState();

  const buttons = ["Общая", "По опросу", "По студенту", "По группе", "По курсу"];

  useEffect(() => {
    fetchUserTestResults().then((testResults) => {
      const testResultsWithKeys = testResults.map((e) => ({ ...e, key: e.id }));
      setTestResults(testResultsWithKeys);
    });
  }, []);

  return (
    <div>
      <div className="statistics-row">
        {buttons.map((button) => (
          <span>
            <StyledStatisticsTypeButton
              onClick={() => {
                setStatisticsType(button);
              }}
              chosen={button === statisticsType}
            >
              {button}
            </StyledStatisticsTypeButton>{" "}
          </span>
        ))}
      </div>
      {statisticsType === "Общая" && (
        <GeneralStatistics testResults={testResults} />
      )}{" "}
      {statisticsType === "По опросу" && (
        <SurveyStatistics testResults={testResults} />
      )}{" "}
      {statisticsType === "По студенту" && (
        <StudentStatistics testResults={testResults} />
      )}{" "}
      {statisticsType === "По группе" && (
        <GroupStatistics testResults={testResults} />
      )}{" "}
      {statisticsType === "По курсу" && (
        <GradeStatistics testResults={testResults} />
      )}
    </div>
  );
};

export default Statistics;
