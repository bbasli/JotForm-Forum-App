import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";

class Login extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    let redirect = <button onClick={this.props.onAuth}>LOGIN</button>;
    if (this.props.user !== null) redirect = <Redirect to="/questions" />;
    return <div>{redirect}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: () => dispatch(actions.auth()),
    authCheckState: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
