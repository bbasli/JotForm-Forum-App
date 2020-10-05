import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";

class Login extends Component {
  loginFunction = () => {
    window.JF.login(() => {
      console.log("Logged in successfully");
      const userApiKey = window.JF.getAPIKey();
      axios
        .get("https://api.jotform.com/user?apiKey=" + userApiKey)
        .then((rsp) => {
          const user = {
            username: rsp.data.content.username,
            avatarUrl: rsp.data.content.avatarUrl,
            apiKey: userApiKey,
          };
          this.props.getUserInfo(user);
          localStorage.setItem("user", JSON.stringify(user));
          this.props.history.push("/questions");
        });
    });
  };

  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) this.props.history.push("/questions");
    return (
      <div>
        <button onClick={this.loginFunction}>LOGIN</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (userInfo) =>
      dispatch({ type: actionTypes.GET_USER_INFO, value: userInfo }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
