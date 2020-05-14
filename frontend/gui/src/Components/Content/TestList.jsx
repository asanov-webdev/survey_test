import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchTests, fetchTestImages } from "../../api";
import { Link } from "react-router-dom";

export const TestList = (props) => {
  const [tests, setTests] = useState([]);
  const [testImages, setTestImages] = useState([]);

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

  if (tests.length !== 0 && testImages.length !== 0)
    return (
      <div className="list">
        {tests.map((test) => (
          <div
            className="list-test"
            onClick={() => {
              props.callback(test.id);
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
    );
  return <p>loading..</p>;
};

export default TestList;
