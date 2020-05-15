import axios from "./axios-config";

export async function fetchTests() {
  const data = await axios.get("/tests/").then((response) => response.data);
  return data;
}

export async function fetchQuestionsById(testId) {
  const data = await axios
    .get("/tests/questions/")
    .then((response) =>
      response.data
        .filter((question) => question.test === testId)
        .sort(
          (question1, question2) =>
            question1.positionInTest - question2.positionInTest
        )
    );
  return data;
}

export async function addQuestionToTest(question) {
  const data = await axios
    .post("/tests/questions/create", question)
    .then((response) => response.data);
  return data;
}

export async function destroyQuestion(question) {
  const url = "/tests/questions/destroy/" + question.id;
  const data = await axios
    .delete(url, question)
    .then((response) => response.data);
  return data;
}

export async function addTest(test) {
  const data = await axios
    .post("/tests/create", test)
    .then((response) => response.data);
  return data;
}

export async function updateTestTitle(test, title) {
  test.title = title;
  const url = "/tests/update/" + test.id;
  const data = await axios.put(url, test).then((response) => response.data);
  return data;
}

export async function updateQuestion(question, text, positionInTest) {
  question.text = text;
  question.positionInTest = positionInTest;
  const url = "/tests/questions/update/" + question.id;
  const data = await axios.put(url, question).then((response) => response.data);
  return data;
}

export async function destroyTest(test) {
  const url = "/tests/destroy/" + test.id;
  const data = await axios.delete(url, test).then((response) => response.data);
  return data;
}

export async function fetchTestResults() {
  const data = await axios
    .get("/tests/test_results/")
    .then((response) => response.data);
  return data;
}

export async function addTestResult(testResult) {
  const data = await axios
    .post("/tests/test_results/create", testResult)
    .then((response) => response.data);
  return data;
}

export async function addQuestionAnswer(questionAnswer) {
  const data = await axios
    .post("/tests/question_answers/create", questionAnswer)
    .then((response) => response.data);
  return data;
}

export async function fetchQuestionImages(questionId) {
  const data = await axios
    .get("/tests/questions/images/")
    .then((response) =>
      response.data.filter((image) => image.question === questionId)
    );
  return data;
}

export async function fetchQuestionAnswerVariants(questionId) {
  const data = await axios
    .get("/tests/questions/answer_variants/")
    .then((response) =>
      response.data.filter(
        (answerVariant) => answerVariant.question === questionId
      )
    );
  return data;
}

export async function registerModuleUser(moduleUser) {
  const data = await axios
    .post("/tests/module_users/create", moduleUser)
    .then((response) => response.data);
  return data;
}

export async function loginModuleUser(login, password) {
  const user = await axios
    .get("/tests/module_users/")
    .then((response) =>
      response.data.find((user) => user.login.localeCompare(login))
    );
  return user && user.password.localeCompare(password);
}

export async function fetchTestImages() {
  const data = await axios
    .get("/tests/test_images/")
    .then((response) => response.data);
  return data;
}

export async function fetchUserTestResults(login) {
  const data = await axios
    .get("/tests/test_results/")
    .then((response) =>
      response.data.filter(
        (testResult) => testResult.participantName.localeCompare(login)
      )
    );
  return data;
}
