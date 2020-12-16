import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initalState = {
  username: "",
  email: "",
  title: "",
  content: "",
  helperUrl: "",
  imageAsFile: "",
  error: "",
  isEdit: false,
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

const setTitle = (state, action) => {
  return updateObject(state, {
    title: action.title,
  });
};

const setContent = (state, action) => {
  return updateObject(state, {
    content: action.content,
  });
};

const setHelperUrl = (state, action) => {
  return updateObject(state, {
    helperUrl: action.helperUrl,
  });
};

const setImageAsFİle = (state, action) => {
  return updateObject(state, {
    imageAsFile: action.imageAsFile,
  });
};

const setIsEdit = (state, action) => {
  return updateObject(state, {
    isEdit: action.edit,
  });
};

const setError = (state, action) => {
  return updateObject(state, {
    error: action.error,
  });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SET_NEW_QUESTION_USERNAME:
      return setUsername(state, action);
    case actionTypes.SET_NEW_QUESTION_EMAIL:
      return setEmail(state, action);
    case actionTypes.SET_NEW_QUESTION_TITLE:
      return setTitle(state, action);
    case actionTypes.SET_NEW_QUESTION_CONTENT:
      return setContent(state, action);
    case actionTypes.SET_NEW_QUESTION_HELPER_URL:
      return setHelperUrl(state, action);
    case actionTypes.SET_NEW_QUESTION_IMAGE_AS_FILE:
      return setImageAsFİle(state, action);
    case actionTypes.POST_NEW_QUESTION_FAIL:
      return setError(state, action);
    case actionTypes.SET_NEW_QUESTION_IS_EDIT:
      return setIsEdit(state, action);
    default:
      return state;
  }
};

export default reducer;
