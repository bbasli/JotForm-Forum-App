import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../Header/Header";
import Heading from "../Heading/Heading";
import HeadingLogo from "../HeadingLogo/HeadingLogo";
import Searchbar from "../Searchbar/Searchbar";
import * as actions from "../store/actions/index";
import Main from "../Main/Main";

class Home extends Component {
  componentDidMount() {
    this.props.authCheckState();
    this.props.fetchTotalQuestionCount();
    this.props.fetchUnsolvedQuestionCount();
    this.props.fetchSolvedQuestionCount();
    this.props.fetchQuestions(0, null);
  }
  render() {
    return (
      <div className="Main">
        <Header>
          <HeadingLogo
            source={
              "http://cdn.jotfor.ms/assets/img/memberkit/answers-header-search-podo-short.png"
            }
          />
          <Heading
            mainHeading={"Form Support"}
            subHeading={
              "Search our library of answered support questions, or submit your own."
            }
          />
          <Searchbar />
        </Header>
        <Main />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckState: () => dispatch(actions.authCheckState()),
    fetchQuestions: (
      pageNumber,
      isSolved,
      myQuestion,
      username,
      searchedText
    ) =>
      dispatch(
        actions.fetchQuestions(
          pageNumber,
          isSolved,
          myQuestion,
          username,
          searchedText
        )
      ),
    fetchTotalQuestionCount: () => dispatch(actions.fetchTotalQuestionCount()),
    fetchUnsolvedQuestionCount: () =>
      dispatch(actions.fetchUnsolvedQuestionCount()),
    fetchSolvedQuestionCount: () =>
      dispatch(actions.fetchSolvedQuestionCount()),
  };
};

export default connect(null, mapDispatchToProps)(Home);
