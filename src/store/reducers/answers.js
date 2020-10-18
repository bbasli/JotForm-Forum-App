import * as actionTypes from "../actions/actionTypes";
import { fetchQuestionFail } from "../actions/answers";
import { updateObject } from "../utility";

const initialState = {
  question: null,
  answers: [],
  answer: null,
  error: null,
  loading: false,
  isSolved: false,
};

const fetchQuestionStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchQuestionSuccess = (state, action) => {
  return updateObject(state, {
    question: action.question,
    error: null,
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
    error: action.err,
    loading: false,
  });
};

const addAnswer = (state, action) => {
  return updateObject(state, {
    answers: [...state.answers, action.newAnswer],
  });
};

const isSolvedQuestion = (state, action) => {
  return updateObject(state, {
    isSolved: action.isSolved,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SELECTED_QUESTION_START:
      return fetchQuestionStart(state, action);
    case actionTypes.FETCH_SELECTED_QUESTION_SUCCESS:
      return fetchQuestionSuccess(state, action);
    case actionTypes.FETCH_SELECTED_QUESTION_FAIL:
        return fetchQuestionFail(state,action);
    case actionTypes.FETCH_ANSWERS_START:
      return fetchAnswersStart(state, action);
    case actionTypes.FETCH_ANSWERS_SUCCESS:
      return fetchAnswersSuccess(state, action);
    case actionTypes.FETCH_ANSWERS_FAIL:
      return fetchAnswersFail(state, action);
    case actionTypes.ADD_ANSWER:
      return addAnswer(state, action);
    case actionTypes.IS_SOLVED_QUESTION:
      return isSolvedQuestion(state, action);
    default:
      return state;
  }
};

export default reducer;
