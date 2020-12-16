import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  content: "",
  username: "",
  email: "",
  imageAsFile: "",
};

const setContent = (state, action) => {
  return updateObject(state, {
    content: action.content,
  });
};

const setUsername = (state, action) => {
  return updateObject(state, {
    username: action.username,
  });
};

const setEmail = (state, action) => {
  return updateObject(state, {
    email: action.email,
  });
};

const setImageAsFile = (state, action) => {
  return updateObject(state, {
    imageAsFile: action.imageAsFile,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NEW_ANSWER_CONTENT:
      return setContent(state, action);
    case actionTypes.SET_NEW_ANSWER_USERNAME:
      return setUsername(state, action);
    case actionTypes.SET_NEW_ANSWER_EMAIL:
      return setEmail(state, action);
    case actionTypes.SET_NEW_ANSWER_IMAGE_AS_FILE:
      return setImageAsFile(state, action);
    default:
      return state;
  }
};

export default reducer;
