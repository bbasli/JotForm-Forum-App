import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  totalQuestionCount: 0,
  unsolvedQuestionCount: 0,
  solvedQuestionCount: 0,
  questions: [],
  errors: [],
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
    loading: false,
  });
};

const fetchQuestionsFail = (state, action) => {
  return updateObject(state, {
    errors: [...state.errors, action.err],
    loading: false,
  });
};

const setTotalQuestionCount = (state, action) => {
  return updateObject(state, {
    totalQuestionCount: action.count,
  });
};

const fetchTotalQuestionCountFail = (state, action) => {
  return updateObject(state, {
    errors: [...state.errors, action.err],
  });
};

const setUnsolvedQuestionCount = (state, action) => {
  return updateObject(state, {
    unsolvedQuestionCount: action.count,
  });
};

const fetchUnsolvedQuestionCountFail = (state, action) => {
  return updateObject(state, {
    errors: [...state.errors, action.err],
  });
};

const setSolvedQuestionCount = (state, action) => {
  return updateObject(state, {
    solvedQuestionCount: action.count,
  });
};

const fetchSolvedQuestionCountFail = (state, action) => {
  return updateObject(state, {
    errors: [...state.errors, action.err],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QUESTIONS_START:
      return fetchQuestionsStart(state, action);
    case actionTypes.FETCH_QUESTIONS_SUCCESS:
      return fetchQuestionsSuccess(state, action);
    case actionTypes.FETCH_QUESTIONS_FAIL:
      return fetchQuestionsFail(state, action);
    case actionTypes.FETCH_TOTAL_QUESTION_COUNT_SUCCESS:
      return setTotalQuestionCount(state, action);
    case actionTypes.FETCH_TOTAL_QUESTION_COUNT_FAIL:
      return fetchTotalQuestionCountFail(state, action);
    case actionTypes.FETCH_UNSOLVED_QUESTION_COUNT_SUCCESS:
      return setUnsolvedQuestionCount(state, action);
    case actionTypes.FETCH_UNSOLVED_QUESTION_COUNT_FAIL:
      return fetchUnsolvedQuestionCountFail(state, action);
    case actionTypes.FETCH_SOLVED_QUESTION_COUNT_SUCCESS:
      return setSolvedQuestionCount(state, action);
    case actionTypes.FETCH_SOLVED_QUESTION_COUNT_FAIL:
      return fetchSolvedQuestionCountFail(state, action);
    default:
      return state;
  }
};

export default reducer;
