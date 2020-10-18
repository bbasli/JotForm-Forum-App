import axios from "axios";

import * as actionTypes from "./actionTypes";

export const fetchQuestionStart = () => {
  return {
    type: actionTypes.FETCH_SELECTED_QUESTION_START,
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
        if (response.status === 200) {
          dispatch(fetchQuestionSuccess(response.data.content));
          if (response.data.content.answers[15].answer !== undefined)
            if (response.data.content.answers[15].answer === "1")
              dispatch(isSolvedQuestion(true));
            else dispatch(isSolvedQuestion(false));
          else dispatch(isSolvedQuestion(false));
        }
      })
      .catch((error) => {
        dispatch(fetchQuestionFail(error));
      });
  };
};

export const fetchQuestionSuccess = (question) => {
  return {
    type: actionTypes.FETCH_SELECTED_QUESTION_SUCCESS,
    question: question,
  };
};

export const fetchQuestionFail = (error) => {
  return {
    type: actionTypes.FETCH_SELECTED_QUESTION_FAIL,
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
          '&filter={"status:ne":"DELETED"}'
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchAnswersSuccess(response.data.content));
        }
      })
      .catch((err) => {
        dispatch(fetchAnswersFail(err));
      });
  };
};

export const fetchAnswersSuccess = (NewAnswers) => {
  return {
    type: actionTypes.FETCH_ANSWERS_SUCCESS,
    answers: NewAnswers,
  };
};

export const fetchAnswersFail = (error) => {
  return {
    type: actionTypes.FETCH_ANSWERS_FAIL,
    err: error,
  };
};

export const addAnswer = (newAnswer) => {
  return {
    type: actionTypes.ADD_ANSWER,
    newAnswer: newAnswer,
  };
};

export const isSolvedQuestion = (param) => {
  return {
    type: actionTypes.IS_SOLVED_QUESTION,
    isSolved: param,
  };
};

export const postIsSolved = (param, questionID) => {
  return (dispatch) => {
    const isSolved = param ? "1" : "0";
    axios
      .post(
        "https://api.jotform.com/submission/" +
          questionID +
          "?apiKey=" +
          process.env.REACT_APP_APP_KEY,
        "submission[15]=" + isSolved
      )
      .then((response) => {
        if (response.status === 200) dispatch(isSolvedQuestion(param));
      });
  };
};
