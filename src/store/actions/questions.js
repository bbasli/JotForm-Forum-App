import axios from "axios";

import * as actionTypes from "./actionTypes";

export const fetchQuestionsStart = () => {
  return {
    type: actionTypes.FETCH_QUESTIONS_START,
  };
};

export const fetchQuestions = (pageNumber, questionPerPage) => {
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
          pageNumber +
          "&orderby=updated_at"
      )
      .then((response) => {
        dispatch(fetchQuestionsSuccess(response.data.content.sort(sortHelper)));
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

export const fetchTotalQuestionCountSuccess = (totalCount) => {
  return {
    type: actionTypes.FETCH_TOTAL_QUESTION_COUNT_SUCCESS,
    count: totalCount,
  };
};

export const fetchAllQuestionSuccess = (allQuestions) => {
  return {
    type: actionTypes.FETCH_ALL_QUESTIONS_SUCCESS,
    all: allQuestions,
  };
};

export const fetchAllQuestions = () => {
  return (dispatch) => {
    axios
      .get(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_QUESTION_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY +
          "&filtering={'status:ne':'DELETED'}&limit=9999"
      )
      .then((response) => {
        if (response.status === 200)
          dispatch(fetchAllQuestionSuccess(response.data.content));
        dispatch(fetchTotalQuestionCountSuccess(response.data.content.length));
      });
  };
};

export const sortHelper = (item, otherItem) => {
  if (
    item.answers[18].answer !== undefined &&
    otherItem.answers[18].answer !== undefined
  ) {
    const itemTime =
      new Date().getTime() - new Date(item.answers[18].answer).getTime();
    const otherItemTime =
      new Date().getTime() - new Date(otherItem.answers[18].answer).getTime();
    return itemTime - otherItemTime;
  } else if (
    item.answers[18].answer !== undefined &&
    otherItem.answers[18].answer === undefined
  ) {
    return -1;
  } else if (
    item.answers[18].answer !== undefined &&
    otherItem.answers[18].answer === undefined
  ) {
    return 1;
  }
  return 1;
};
