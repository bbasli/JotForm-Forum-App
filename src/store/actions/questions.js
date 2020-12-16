import axios from "axios";

import * as actionTypes from "./actionTypes";

// TO GET QUESTIONS
export const fetchQuestionsStart = () => {
  return {
    type: actionTypes.FETCH_QUESTIONS_START,
  };
};

export const fetchQuestions = (
  pageNumber,
  isSolved,
  isMyQuestion = false,
  username = null,
  searchedText = null
) => {
  return (dispatch) => {
    dispatch(fetchQuestionsStart());
    let requestUrl =
      "https://api.jotform.com/form/" +
      process.env.REACT_APP_QUESTION_FORM_ID +
      "/submissions?apiKey=" +
      process.env.REACT_APP_APP_KEY +
      "&limit=10";

    let filter = '&filter={"status:ne":"DELETED", "limit":"10"';
    if (isMyQuestion) filter += ',"q3:eq:fullname": "' + username + '"';
    if (searchedText !== null) filter += ',"q5:maches": "' + searchedText + '"';
    if (isSolved !== null)
      if (isSolved) filter += ',"q15:eq:number":"1"';
      else filter += ',"q15:eq:number":"0"';
    filter += "}";
    requestUrl += filter + "&offset=" + pageNumber;
    //console.log("URL ", requestUrl);
    axios
      .get(requestUrl)
      .then((response) => {
        if (response.status === 200)
          if (response.data.content.length > 0)
            dispatch(fetchQuestionsSuccess(response.data.content));
          else dispatch(fetchQuestionsFail("You have no question!!!"));
        else
          console.log(
            "Fetch Question Count Response Code is not 200 (" +
              response.status +
              ")"
          );
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

// TO CALCULATE PAGE COUNT
export const fetchTotalQuestionCountStart = () => {
  return {
    type: actionTypes.FETCH_TOTAL_QUESTION_COUNT_START,
  };
};

export const fetchTotalQuestionCount = () => {
  return (dispatch) => {
    dispatch(fetchTotalQuestionCountStart());
    axios
      .get(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_QUESTION_FORM_ID +
          "?apiKey=" +
          process.env.REACT_APP_APP_KEY +
          "&limit=9999"
      )
      .then((response) => {
        if (response.status === 200)
          dispatch(fetchTotalQuestionCountSuccess(response.data.content.count));
        else
          console.log(
            "Fetch Total Question Count response is not 200.(" +
              response.status +
              ")"
          );
      })
      .catch((error) => dispatch(fetchTotalQuestionCountFail(error.data)));
  };
};

export const fetchTotalQuestionCountSuccess = (length) => {
  return {
    type: actionTypes.FETCH_TOTAL_QUESTION_COUNT_SUCCESS,
    count: length,
  };
};

export const fetchTotalQuestionCountFail = (error) => {
  return {
    type: actionTypes.FETCH_TOTAL_QUESTION_COUNT_FAIL,
    err: error,
  };
};

// TO GET UNSOLVED QUESTION COUNT
export const fetchUnsolvedQuestionCountStart = () => {
  return {
    type: actionTypes.FETCH_UNSOLVED_QUESTION_COUNT_START,
  };
};

export const fetchUnsolvedQuestionCount = () => {
  return (dispatch) => {
    dispatch(fetchUnsolvedQuestionCountStart());
    axios
      .get(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_QUESTION_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY +
          '&limit=9999&filter={"q15:eq:control_number":"0" }'
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.content.count !== "0")
            dispatch(
              fetchUnsolvedQuestionCountSuccess(
                parseInt(response.data.content.length)
              )
            );
          else
            dispatch(fetchUnsolvedQuestionCountFail("No Unsolved Question!!!"));
        } else
          console.log(
            "Fetch Total Question Count response is not 200.(" +
              response.status +
              ")"
          );
      })
      .catch((error) => dispatch(fetchUnsolvedQuestionCountFail(error.data)));
  };
};

export const fetchUnsolvedQuestionCountSuccess = (length) => {
  return {
    type: actionTypes.FETCH_UNSOLVED_QUESTION_COUNT_SUCCESS,
    count: length,
  };
};

export const fetchUnsolvedQuestionCountFail = (error) => {
  return {
    type: actionTypes.FETCH_UNSOLVED_QUESTION_COUNT_FAIL,
    err: error,
  };
};

// TO SET SOLVED QUESTION COUNT
export const fetchSolvedQuestionCountStart = () => {
  return {
    type: actionTypes.FETCH_SOLVED_QUESTION_COUNT_START,
  };
};

export const fetchSolvedQuestionCount = () => {
  return (dispatch) => {
    dispatch(fetchSolvedQuestionCountStart());
    axios
      .get(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_QUESTION_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY +
          '&limit=9999&filter={"q15:eq:control_number":"1" }'
      )
      .then((response) => {
        if (response.status === 200)
          if (response.data.content.count !== "0")
            dispatch(
              fetchSolvedQuestionCountSuccess(
                parseInt(response.data.content.length)
              )
            );
          else
            dispatch(fetchSolvedQuestionCountFail("No Unsolved Question!!!"));
        else
          console.log(
            "Fetch Total Question Count response is not 200.(" +
              response.status +
              ")"
          );
      })
      .catch((error) => dispatch(fetchSolvedQuestionCountFail(error.data)));
  };
};

export const fetchSolvedQuestionCountSuccess = (length) => {
  return {
    type: actionTypes.FETCH_SOLVED_QUESTION_COUNT_SUCCESS,
    count: length,
  };
};

export const fetchSolvedQuestionCountFail = (error) => {
  return {
    type: actionTypes.FETCH_SOLVED_QUESTION_COUNT_FAIL,
    err: error,
  };
};
