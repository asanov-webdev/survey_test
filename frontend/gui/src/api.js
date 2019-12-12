import axios from "./axios-config";

export async function fetchTests() {
  const response = await axios.get("/tests/");
  return response.data;
}

export async function fetchQuestionsById(testId) {
  const questions = await axios
    .get("/tests/questions/")
    .then(response =>
      response.data
        .filter(question => question.test === testId)
        .sort(
          (question1, question2) =>
            question1.positionInTest - question2.positionInTest
        )
    );
  return questions;
}

export async function addQuestionToTest(question) {
  await axios.post("/tests/questions/create", question);
}

export async function addTest(test) {
  await axios.post("/tests/create", test);
}

export async function fetchTestResults() {
  const response = await axios.get("/tests/test_results/");
  return response.data;
}

export async function addTestResult(testResult) {
  await axios.post("/tests/test_results/create", testResult).then(() => {});
}

export async function addQuestionAnswer(questionAnswer) {
  await axios.post("/tests/question_answers/create", questionAnswer);
}
