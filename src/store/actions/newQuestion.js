import axios from "axios";
import { storage } from "../../Firebase/Firebase";
import uuid from "react-uuid";

import * as actionTypes from "./actionTypes";

export const setNewQuestionUsername = (newUsername) => {
  return {
    type: actionTypes.SET_NEW_QUESTION_USERNAME,
    username: newUsername,
  };
};

export const setNewQuestionEmail = (newEmail) => {
  return {
    type: actionTypes.SET_NEW_QUESTION_EMAIL,
    email: newEmail,
  };
};

export const setNewQuestionTitle = (newTitle) => {
  return {
    type: actionTypes.SET_NEW_QUESTION_TITLE,
    title: newTitle,
  };
};

export const setNewQuestionContent = (newContent) => {
  return {
    type: actionTypes.SET_NEW_QUESTION_CONTENT,
    content: newContent,
  };
};

export const setNewQuestionHelperUrl = (newUrl) => {
  return {
    type: actionTypes.SET_NEW_QUESTION_HELPER_URL,
    helperUrl: newUrl,
  };
};

export const setNewQuestionImageAsFile = (newFile) => {
  return {
    type: actionTypes.SET_NEW_QUESTION_IMAGE_AS_FILE,
    imageAsFile: newFile,
  };
};

export const setIsEdit = (isEdit) => {
  return {
    type: actionTypes.SET_NEW_QUESTION_IS_EDIT,
    edit: isEdit,
  };
};

export const postNewQuestionStart = () => {
  return {
    type: actionTypes.POST_NEW_QUESTION_START,
  };
};

export const postNewQuestionSuccess = () => {
  return {
    type: actionTypes.POST_NEW_QUESTION_SUCCESS,
  };
};

export const postNewQuestionFail = (error) => {
  return {
    type: actionTypes.POST_NEW_QUESTION_FAIL,
    error: error,
  };
};

export const postNewQuestion = (
  username,
  email,
  avatarUrl,
  title,
  content,
  helperUrl,
  imageAsFile,
  isEdit = false,
  questionID
) => {
  return (dispatch) => {
    dispatch(postNewQuestionStart);

    let requestUrl =
      "https://api.jotform.com/form/" +
      process.env.REACT_APP_QUESTION_FORM_ID +
      "/submissions?apiKey=" +
      process.env.REACT_APP_APP_KEY;

    if (isEdit)
      requestUrl =
        "https://api.jotform.com/submission/" +
        questionID +
        "?apiKey=" +
        process.env.REACT_APP_APP_KEY;

    let formData = new FormData();
    let uniqueImgID = "";

    formData.append("submission[3_first]", username);
    formData.append("submission[5]", title);
    formData.append("submission[6]", content);
    formData.append("submission[7]", helperUrl);
    formData.append("submission[9]", 0);
    formData.append("submission[10]", avatarUrl);
    formData.append("submission[13]", email);
    formData.append("submission[15]", 0);
    formData.append("submission[17]", "[]");
    formData.append("submission[18]", new Date().getTime());

    if (imageAsFile !== "") {
      uniqueImgID = uuid();
      formData.append("submission[14]", uniqueImgID);
      const uploadTask = storage.ref(`/images/${uniqueImgID}`).put(imageAsFile);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.error(error);
        },
        () => {
          axios({
            method: "post",
            url: requestUrl,
            data: formData,
            headers: { "Content-type": "multipart/form-data" },
          })
            .then((response) => {
              dispatch(postNewQuestionSuccess);
              window.location = "/";
            })
            .catch((error) => {
              dispatch(postNewQuestionFail);
              console.error(error);
            });
        }
      );
    } else {
      formData.append("submission[14]", uniqueImgID);

      axios({
        method: "post",
        url: requestUrl,
        data: formData,
        headers: { "Content-type": "multipart/form-data" },
      })
        .then((response) => {
          dispatch(postNewQuestionSuccess);
          window.location = "/";
        })
        .catch((error) => {
          dispatch(postNewQuestionFail);
          console.error(error);
        });
    }
  };
};

export const getEditedQuestion = (questionId) => {
  return (dispatch) => {
    const requestUrl =
      "https://api.jotform.com/submission/" +
      questionId +
      "?apiKey=" +
      process.env.REACT_APP_APP_KEY +
      '&filter={"status:ne":"DELETED"}';

    axios.get(requestUrl).then((response) => {
      const data = response.data.content.answers;
      console.log("DATA: ", data);
      dispatch(setIsEdit(true));
      dispatch(setNewQuestionTitle(data[5].answer));
      dispatch(setNewQuestionContent(data[6].answer));
      dispatch(setNewQuestionHelperUrl(data[7].answer));
    });
  };
};
