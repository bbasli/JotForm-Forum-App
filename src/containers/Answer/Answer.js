import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Toolbar from "../../components/Header/Toolbar/Toolbar";
import "./Answer.css";
import JFSupport from "../JFSupport/JFSupport";
import NewAnswer from "./NewAnswer/NewAnswer";
import UserCard from "../UserCard/UserCard";
import * as actions from "../../store/actions/index";

class Answer extends Component {
  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.id);
    this.props.fetchAnswers();
    this.props.authCheckState();
  }

  usernameHandler = (user) => {
    let name = user.answer.first;
    if (user.answer.last !== "" && user.answer.last !== undefined)
      name += " " + user.answer.last;
    return name;
  };

  render() {
    let answers = null;
    if (this.props.answers.length > 0) {
      const temp = this.props.answers;
      answers = temp
        .filter((answer) => {
          return (
            answer.answers[7].answer === this.props.match.params.id &&
            answer.status === "ACTIVE"
          );
        })
        .map((answer) => {
          return (
            <UserCard
              key={answer.id}
              id={answer.id}
              user={{
                username: answer.answers[4].answer.first,
                avatarUrl: answer.answers[6].answer,
              }}
              type="Answer"
              created_at={answer.created_at}
              content={answer.answers[3].answer}
              isAsked={false}
              ssUrl={
                answer.answers[9].answer === undefined
                  ? null
                  : answer.answers[9].answer
              }
              likeList={
                answer.answers[11].answer === undefined
                  ? null
                  : answer.answers[11].answer
              }
            />
          );
        })
        .reverse();
    }
    let isSolvedContainer = null;
    if (this.props.user !== null && this.props.question !== null) {
      if (
        this.props.user.username ===
        this.usernameHandler(this.props.question.answers[3])
      )
        isSolvedContainer = (
          <div>
            <p>
              <strong>
                If your problem is solved, please click the button and mark it
                as solved.
              </strong>
            </p>
            <button
              className="Solve"
              onClick={() =>
                this.props.postSolved(
                  !this.props.solved,
                  this.props.question.id
                )
              }
            >
              {this.props.solved ? "Solved" : "Unsolved"}
            </button>
          </div>
        );
    }
    console.log("[Answer.js] rendering...");
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div id="Overlay">
          <div className="ZoomedImage"></div>
        </div>
        <div className="Head">
          <div className="LeftTop"></div>
          <div className="MiddleTop">
            <Toolbar />
          </div>
          <div className="RightTop"></div>
        </div>
        <div className="Container">
          <div className="LeftTop"></div>
          <div className="Mid">
            <div className="Left">
              <div className="GoBack">
                <NavLink to="/questions">
                  <i className="fas fa-chevron-left"></i>
                  <span>&nbsp;&nbsp;Form Support</span>
                </NavLink>
              </div>
              <button className="Ask">
                <NavLink
                  to={{
                    pathname: "/new-question",
                  }}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Ask your question
                </NavLink>
              </button>
              <JFSupport />
              {isSolvedContainer}
            </div>
            {/* MAIN PART OF PAGE */}
            <div className="Main">
              <div>
                {this.props.question !== null &&
                this.props.question.answers[5] !== undefined ? (
                  <div>
                    <span>{this.props.question.answers[5].answer}</span>
                    <UserCard
                      id={this.props.question.id}
                      user={{
                        username: this.usernameHandler(
                          this.props.question.answers[3]
                        ),
                        avatarUrl: this.props.question.answers[10].answer,
                      }}
                      type="Question"
                      created_at={this.props.question.created_at}
                      content={this.props.question.answers[6].answer}
                      helperUrl={this.props.question.answers[7].answer}
                      ssUrl={
                        this.props.question.answers[14].answer === undefined
                          ? null
                          : this.props.question.answers[14].answer
                      }
                      isAsked={true}
                      likeList={
                        this.props.question.answers[17].answer === undefined
                          ? null
                          : this.props.question.answers[17].answer
                      }
                    />
                  </div>
                ) : null}
              </div>
              {answers}
              {answers !== null && this.props.question !== null ? (
                <NewAnswer
                  questionID={this.props.match.params.id}
                  user={this.props.user}
                  replyCount={this.props.question.answers[9].answer}
                  fetchAnswers={this.props.fetchAnswers}
                />
              ) : null}
            </div>
          </div>
          <div className="RightTop"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    answers: state.answers.answers,
    question: state.answers.question,
    solved: state.answers.isSolved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAnswers: () => dispatch(actions.fetchAnswers()),
    fetchQuestion: (id) => dispatch(actions.fetchQuestion(id)),
    authCheckState: () => dispatch(actions.authCheckState()),
    auth: () => dispatch(actions.auth()),
    isSolved: (param) => dispatch(actions.isSolvedQuestion(param)),
    postSolved: (value, questionID) =>
      dispatch(actions.postIsSolved(value, questionID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
