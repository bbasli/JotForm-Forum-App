import React, { Component } from "react";
import { connect } from "react-redux";

import "./Forum.css";
import Header from "../../components/Header/Header";
import Body from "../../components/Body/Body";
import Questions from "../Questions/Questions";
import * as actions from "../../store/actions/index";

class Forum extends Component {
  componentDidMount() {
    console.log("[Forum.js] componentDidMount");
    this.props.authCheckState();
    this.props.fetchTotalQuestionCount();
    this.props.fetchQuestions(0, this.props.questionPerPage);
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    if (this.props.questions.length > 0) {
      console.log("This state: ", this.props.questions[0].id);
      console.log("Next state: ", nextProps.questions[0].id);
      //console.log(this.state.questions[0].id !== nextState.questions[0].id);
      return this.props.questions[0].id !== nextProps.questions[0].id;
    } else return true;
  } */

  render() {
    console.log("[Forum.js] rendering...");

    let questions = null;
    let container = null;
    if (this.props.questions.length > 0) {
      questions = <Questions questions={this.props.questions} />;
      let pages = [];
      const pageCount = Math.ceil(
        this.props.totalQuestionCount / this.props.questionPerPage
      );
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
      container = pages.map((page) => {
        let offset = page * this.props.questionPerPage;
        return (
          <button
            key={offset}
            onClick={() =>
              this.props.fetchQuestions(offset, this.props.questionPerPage)
            }
          >
            {page + 1}
          </button>
        );
      });
    }
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="Edge"></div>
        <div style={{ width: "63%" }}>
          <Header showSearchBar={true} />
          <Body>
            {questions}
            <div className="Pages">{container}</div>
          </Body>
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
    fetchTotalQuestionCount: () => dispatch(actions.fetchTotalQuestionCount()),
    fetchQuestions: (pageNumber, questionPerPage) =>
      dispatch(actions.fetchQuestions(pageNumber, questionPerPage)),
    authCheckState: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forum);
