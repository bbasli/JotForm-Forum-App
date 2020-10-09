import axios from "axios";

import * as actionTypes from "./actionTypes";

export const fetchQuestionsStart = () => {
  return {
    type: actionTypes.FETCH_QUESTIONS_START,
  };
};

export const fetchQuestions = (
  pageNumber,
  questionPerPage,
  searchedText = null
) => {
  return (dispatch) => {
    dispatch(fetchQuestionsStart());
    axios
      .get(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_QUESTION_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY +
          "&limit=" +
          questionPerPage +
          '&filter={"status:ne":"DELETED"}&offset=' +
          pageNumber
      )
      .then((response) => {
        //console.log("getQuestions", response);
        if (searchedText === null)
          dispatch(fetchQuestionsSuccess(response.data.content));
      })
      .catch((err) => {
        dispatch(fetchQuestionsFail(err.data));
      });
  };
};

export const fetchQuestionsSuccess = (newQuestions) => {
  return {
    type: actionTypes.FETCH_QUESTIONS_SUCCESS,
    questions: newQuestions,
  };
};

export const fetchQuestionsFail = (error) => {
  return {
    type: actionTypes.FETCH_QUESTIONS_FAIL,
    err: error,
  };
};

export const fetchTotalQuestionCount = () => {
  return (dispatch) => {
    axios
      .get(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_QUESTION_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY +
          '&limit=9999&filter={"status:ne":"DELETED"}'
      )
      .then((response) => {
        dispatch(fetchTotalQuestionCountSuccess(response.data.content.length));
      });
  };
};

export const fetchTotalQuestionCountSuccess = (totalCount) => {
  return {
    type: actionTypes.FETCH_TOTAL_QUESTION_COUNT_SUCCESS,
    count: totalCount,
  };
};
