import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  questions: [],
  totalQuestionCount: 0,
  questionPerPage: 10,
  error: null,
  loading: false,
};

const fetchQuestionsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchQuestionsSuccess = (state, action) => {
  return updateObject(state, {
    questions: action.questions,
    error: null,
    loading: false,
  });
};

const fetchQuestionsFail = (state, action) => {
  return updateObject(state, {
    error: action.err,
    loading: false,
  });
};

const setTotalQuestionCount = (state, action) => {
  return updateObject(state, {
    totalQuestionCount: action.count,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QUESTIONS_START:
      return fetchQuestionsStart(state, action);
    case actionTypes.FETCH_TOTAL_QUESTION_COUNT_SUCCESS:
      return setTotalQuestionCount(state, action);
    case actionTypes.FETCH_QUESTIONS_FAIL:
      return fetchQuestionsFail(state, action);
    case actionTypes.FETCH_QUESTIONS_SUCCESS:
      return fetchQuestionsSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
