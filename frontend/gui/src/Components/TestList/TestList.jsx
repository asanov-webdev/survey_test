import React, { useState, useEffect } from "react";
import { fetchTests } from "../../api";
import { Button } from "antd";
import "./styles.css";
import { Test } from "./Test";

export function TestList() {
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);

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
            onClick={() => setActiveTest(test)}
          >
            {test.title}
          </Button>
        ))}
      </div>
      {activeTest && <Test test={activeTest} />}
    </div>
  );
}
