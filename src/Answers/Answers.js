import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import AnswerCards from "../AnswerCards/AnswerCards";
import AskButton from "../AskButton/AskButton";
import ForumInfo from "../ForumInfo/ForumInfo";
import NewAnswer from "../NewAnswer/NewAnswer";
import Toolbar from "../Toolbar/Toolbar";
import QuestionCard from "../QuestionCard/QuestionCard";
import SolvedButton from "../SolvedButton/SolvedButton";

import * as actions from "../store/actions/index";

class Answers extends Component {
  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.id);
    this.props.fetchAnswers();
    this.props.authCheckState();
  }

  isSolvedHandler = (isSolved) => {
    const requestUrl =
      "https://api.jotform.com/submission/" +
      this.props.match.params.id +
      "?apiKey=" +
      process.env.REACT_APP_APP_KEY;

    axios
      .post(
        requestUrl,
        "submission[15]=" + isSolved + "&submission[18]=" + new Date().getTime()
      )
      .then((response) => this.props.fetchQuestion(this.props.match.params.id));
  };

  render() {
    if (this.props.question !== null && this.props.answers !== []) {
      console.log(this.props.question.answers[3].answer.first);

      let isSolvedContainer = null;
      if (this.props.user !== null)
        if (
          this.props.user.username ===
          this.props.question.answers[3].answer.first
        )
          isSolvedContainer = (
            <SolvedButton
              isSolved={this.props.question.answers[15].answer}
              questionID={this.props.question.id}
              clicked={this.isSolvedHandler}
            />
          );

      return (
        <div>
          <header className="header">
            <div className="header-answers">
              <Toolbar />
            </div>
          </header>
          <main className="main-container main-answers">
            <div id="Overlay">
              <div className="ZoomedImage"></div>
            </div>
            <div className="info-articles">
              <Link className="go-back-box u-fs-3 u-blue-text" to="/">
                <i className="fas fa-chevron-left"></i>&nbsp;
                <span>Forum Support</span>
              </Link>
              <AskButton />
              <ForumInfo />
              {isSolvedContainer}
            </div>
            <div className="main-box">
              <h1 className="u-blue-text u-fs-2">
                {this.props.question.answers[5].answer}
              </h1>
              <QuestionCard question={this.props.question} />
              <AnswerCards
                answers={this.props.answers}
                questionId={this.props.match.params.id}
              />
              <NewAnswer
                questionID={this.props.match.params.id}
                replyCount={this.props.question.answers[9].answer}
              />
            </div>
          </main>
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => {
  return {
    answers: state.answers.answers,
    question: state.answers.question,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckState: () => dispatch(actions.authCheckState()),
    fetchQuestion: (id) => dispatch(actions.fetchQuestion(id)),
    fetchAnswers: () => dispatch(actions.fetchAnswers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
