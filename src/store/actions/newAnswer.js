import axios from "axios";
import { storage } from "../../Firebase/Firebase";

import * as actionTypes from "./actionTypes";

export const setContent = (newContent) => {
  return {
    type: actionTypes.SET_NEW_ANSWER_CONTENT,
    content: newContent,
  };
};

export const setUsername = (newUsername) => {
  return {
    type: actionTypes.SET_NEW_ANSWER_USERNAME,
    username: newUsername,
  };
};

export const setEmail = (newEmail) => {
  return {
    type: actionTypes.SET_NEW_ANSWER_EMAIL,
    email: newEmail,
  };
};

export const setImageAsFile = (newFile) => {
  return {
    type: actionTypes.SET_NEW_ANSWER_IMAGE_AS_FILE,
    imageAsFile: newFile,
  };
};

export const postAll = (
  questionID,
  uniqueImgID,
  imageAsFile,
  newAnswer,
  replyCount,
  updateAnswers
) => {
  return (dispatch) => {
    if (imageAsFile === "") {
      dispatch(postAnswer(questionID, newAnswer, replyCount, updateAnswers));
    } else {
      const uploadTask = storage.ref(`/images/${uniqueImgID}`).put(imageAsFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
        },
        () => {
          dispatch(
            postAnswer(questionID, newAnswer, replyCount, updateAnswers)
          );
        }
      );
    }
  };
};

export const postAnswerStart = () => {
  return {
    type: actionTypes.POST_ANSWER_START,
  };
};

export const postAnswer = (
  questionID,
  newAnswer,
  replyCount,
  updateAnswers
) => {
  return (dispatch) => {
    dispatch(postAnswerStart());
    axios
      .put(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_ANSWER_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY,
        newAnswer
      )
      .then((response) => {
        console.log("post new answer response", response.data.responseCode);
        if (response.data.responseCode === 200) {
          updateAnswers();
          dispatch(postAnswerSuccess());
          dispatch(
            updateQuestionReplyCount(questionID, parseInt(replyCount) + 1)
          );
        }
      });
  };
};

export const postAnswerSuccess = () => {
  return {
    type: actionTypes.POST_ANSWER_SUCCESS,
  };
};

export const postAnswerFail = (error) => {
  return {
    type: actionTypes.POST_ANSWER_FAIL,
    err: error,
  };
};

export const updateQuestionReplyCount = (questionID, replyCount) => {
  return (dispatch) => {
    axios
      .post(
        "https://api.jotform.com/submission/" +
          questionID +
          "?apiKey=" +
          process.env.REACT_APP_APP_KEY,
        "submission[9]=" +
          replyCount +
          "&submission[18]=" +
          new Date().getTime()
      )
      .then((response) => {
        if (response.data.responseCode === 200) {
          console.log(response);
          dispatch(setContent(""));
          dispatch(setImageAsFile(""));
        }
      });
  };
};
