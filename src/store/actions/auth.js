import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return (dispatch) => {
    const requestUrl = "https://api.jotform.com/user?apiKey=" + token;
    axios
      .get(requestUrl)
      .then((response) => {
        const user = {
          username: response.data.content.username,
          name: response.data.content.name,
          email: response.data.content.email,
          avatarUrl: response.data.content.avatarUrl,
          account_type: response.data.content.account_type,
        };
        dispatch(setAuth(token, user));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const setAuth = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    apiKey: token,
    userInfo: user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = () => {
  return (dispatch) => {
    dispatch(authStart());
    window.JF.login(() => {
      console.log("Logged in successfully");
      const userApiKey = window.JF.getAPIKey();
      localStorage.setItem("token", userApiKey);
      dispatch(authSuccess(userApiKey));
    });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) dispatch(logout());
    else {
      dispatch(authSuccess(token));
    }
  };
};
