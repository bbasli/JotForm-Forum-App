import React from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";

import * as actions from "../store/actions/index";

const QuestionTabs = (props) => {
  const handleSelect = (key) => {
    let isSolved = false;
    switch (key) {
      case "Unsolved":
        props.setTotalCount(props.unsolvedQuestionCount);
        break;
      case "Solved":
        isSolved = true;
        props.setTotalCount(props.solvedQuestionCount);
        break;
      case "All":
        isSolved = null;
        props.setTotalCount(props.totalQuestionCount);
        break;
      default:
        break;
    }
    if (props.user !== null)
      props.fetchQuestions(0, isSolved, props.myQuestion, props.user.username);
    else
      props.fetchQuestions(0, isSolved, props.myQuestion);
  };
  return (
    <Tabs defaultActiveKey="All" onSelect={handleSelect}>
      <Tab eventKey="All" title="All"></Tab>
      <Tab eventKey="Unsolved" title="Unsolved"></Tab>
      <Tab eventKey="Solved" title="Solved"></Tab>
    </Tabs>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    totalQuestionCount: state.questions.totalQuestionCount,
    unsolvedQuestionCount: state.questions.unsolvedQuestionCount,
    solvedQuestionCount: state.questions.solvedQuestionCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestions: (
      pageNumber,
      isSolved,
      isMyQuestion,
      username,
      searchedText
    ) =>
      dispatch(
        actions.fetchQuestions(
          pageNumber,
          isSolved,
          isMyQuestion,
          username,
          searchedText
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionTabs);
