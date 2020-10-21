import React, { Component } from "react";
import { connect } from "react-redux";

import "./Forum.css";
import Header from "../../components/Header/Header";
import Body from "../../components/Body/Body";
import * as actions from "../../store/actions/index";

class Forum extends Component {
  componentDidMount() {
    this.props.authCheckState();
    this.props.fetchAllQuestions();
    this.props.fetchQuestions(0, this.props.questionPerPage);
  }
  render() {
    console.log("[Forum.js] rendering...");
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="Edge"></div>
        <div className="Middle">
          <Header showSearchBar={true} />
          <Body />
        </div>
        <div className="Edge"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalQuestionCount: state.questions.totalQuestionCount,
    questionPerPage: state.questions.questionPerPage,
    questions: state.questions.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllQuestions: () => dispatch(actions.fetchAllQuestions()),
    fetchQuestions: (pageNumber, questionPerPage) =>
      dispatch(actions.fetchQuestions(pageNumber, questionPerPage)),
    authCheckState: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forum);
