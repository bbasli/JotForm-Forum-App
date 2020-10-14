import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Toolbar from "../../components/Header/Toolbar/Toolbar";
import "./Answer.css";
import JFSupport from "../JFSupport/JFSupport";
import NewAnswer from "./NewAnswer/NewAnswer";
import UserCard from "../UserCard/UserCard";
import * as actions from "../../store/actions/index";
import Modal from "../../components/Modal/Modal";

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
    let modal = null;
    if (this.props.user === null) {
      modal = <Modal auth={this.props.auth} action="ask" />;
    }
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
            />
          );
        })
        .reverse();
    }
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="Head">
          <div style={{ width: "20%" }}></div>
          <div style={{ width: "60%" }}>
            <Toolbar />
          </div>
          <div style={{ width: "20%" }}></div>
        </div>
        <div className="Container">
          <div style={{ width: "20%" }}></div>
          <div className="Mid">
            <div className="Left">
              <div className="GoBack">
                <NavLink to="/questions">
                  <i className="fas fa-chevron-left"></i>
                  <span>&nbsp;&nbsp;Form Support</span>
                </NavLink>
              </div>
              <JFSupport />
            </div>
            {/* MAIN PART OF PAGE */}
            <div className="Main">
              <div>
                {modal}
                {this.props.question !== null ? (
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
                      isAsked={true}
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
                  auth={this.props.auth}
                />
              ) : null}
            </div>
          </div>
          <div style={{ width: "20%" }}></div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAnswers: () => dispatch(actions.fetchAnswers()),
    fetchQuestion: (id) => dispatch(actions.fetchQuestion(id)),
    authCheckState: () => dispatch(actions.authCheckState()),
    auth: () => dispatch(actions.auth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
