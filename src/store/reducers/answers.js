import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  question: null,
  answers: [],
  answer: null,
  loading: false,
  errors: [],
};

const fetchQuestionStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchQuestionSuccess = (state, action) => {
  return updateObject(state, {
    question: action.question,
    loading: false,
  });
};

const fetchQuestionFail = (state, action) => {
  return updateObject(state, {
    errors: [...state.errors, action.err],
    loading: false,
  });
};

const fetchAnswersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchAnswersSuccess = (state, action) => {
  return updateObject(state, {
    answers: action.answers,
  });
};

const fetchAnswersFail = (state, action) => {
  return updateObject(state, {
    errors: [...state.errors, action.err],
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QUESTION_START:
      return fetchQuestionStart(state, action);
    case actionTypes.FETCH_QUESTION_SUCCESS:
      return fetchQuestionSuccess(state, action);
    case actionTypes.FETCH_QUESTION_FAIL:
      return fetchQuestionFail(state, action);
    case actionTypes.FETCH_ANSWERS_START:
      return fetchAnswersStart(state, action);
    case actionTypes.FETCH_ANSWERS_SUCCESS:
      return fetchAnswersSuccess(state, action);
    case actionTypes.FETCH_ANSWERS_FAIL:
      return fetchAnswersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
