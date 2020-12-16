import axios from "axios";

import * as actionTypes from "./actionTypes";

export const fetchQuestionStart = () => {
  return {
    type: actionTypes.FETCH_QUESTION_START,
  };
};

export const fetchQuestion = (submissionID) => {
  return (dispatch) => {
    dispatch(fetchQuestionStart());
    axios
      .get(
        "https://api.jotform.com/submission/" +
          submissionID +
          "?apiKey=" +
          process.env.REACT_APP_APP_KEY +
          '&filter={"status:ne":"DELETED"}'
      )
      .then((response) => {
        if (response.status === 200)
          dispatch(fetchQuestionSuccess(response.data.content));
        else dispatch(fetchQuestionFail(response.status));
      })
      .catch((error) => {
        dispatch(fetchQuestionFail(error));
      });
  };
};

export const fetchQuestionSuccess = (question) => {
  return {
    type: actionTypes.FETCH_QUESTION_SUCCESS,
    question: question,
  };
};

export const fetchQuestionFail = (error) => {
  return {
    type: actionTypes.FETCH_QUESTION_FAIL,
    err: error,
  };
};

export const fetchAnswersStart = () => {
  return {
    type: actionTypes.FETCH_ANSWERS_START,
  };
};

export const fetchAnswers = () => {
  return (dispatch) => {
    dispatch(fetchAnswersStart());
    axios
      .get(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_ANSWER_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY +
          '&filter={"status:ne":"DELETED"}&limit=9999'
      )
      .then((response) => {
        if (response.status === 200)
          dispatch(fetchAnswersSuccess(response.data.content));
        else dispatch(fetchAnswersFail(response.status));
      })
      .catch((err) => {
        dispatch(fetchAnswersFail(err));
      });
  };
};

export const fetchAnswersSuccess = (newAnswers) => {
  return {
    type: actionTypes.FETCH_ANSWERS_SUCCESS,
    answers: newAnswers,
  };
};

export const fetchAnswersFail = (error) => {
  return {
    type: actionTypes.FETCH_ANSWERS_FAIL,
    err: error,
  };
};
