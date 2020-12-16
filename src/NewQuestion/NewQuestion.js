import React, { Component } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";

import Header from "../Header/Header";
import Heading from "../Heading/Heading";
import HeadingLogo from "../HeadingLogo/HeadingLogo";

import * as actions from "../store/actions/index";

class NewQuestion extends Component {
  componentDidMount() {
    this.props.authCheckState();
    if (this.props.location.aboutProps !== undefined) {
      if (this.props.location.aboutProps.type === "Asked on") {
        this.props.getQuestion(this.props.location.aboutProps.questionID);
      }
    }
  }

  render() {
    const handleImageAsFile = (event) => {
      const image = event.target.files[0];
      this.props.setImageAsFile(image);
    };

    const submit = (e) => {
      e.preventDefault();
      let questionID = null;
      if (this.props.location.aboutProps !== undefined)
        questionID = this.props.location.aboutProps.questionID;

      if (this.props.user !== null)
        this.props.postQuestion(
          this.props.user.username,
          this.props.user.email,
          this.props.user.avatarUrl,
          this.props.title,
          this.props.content,
          this.props.helperUrl,
          this.props.imageAsFile,
          this.props.isEdited,
          questionID
        );
      else
        this.props.postQuestion(
          this.props.username,
          this.props.email,
          this.props.avatarUrl,
          this.props.title,
          this.props.content,
          this.props.helperUrl,
          this.props.imageAsFile,
          this.props.isEdited,
          questionID
        );
    };

    return (
      <div className="Main">
        <Header>
          <HeadingLogo
            source={
              "//cdn.jotfor.ms/assets/img/memberkit/answers-create-podo.svg?v=1"
            }
          />
          <Heading
            mainHeading={"Contact JotForm Support"}
            subHeading={"Our customer support team is available 24/7"}
          />
        </Header>
        <main className="main-container">
          <form className="new-question" onSubmit={submit}>
            <h1 className="new-question-title u-blue-text">How can we help?</h1>
            <div className="new-question-fields">
              {this.props.user !== null ? null : (
                <div className="unlogged-user-fields">
                  <input
                    type="text"
                    className="u-br-gr"
                    placeholder="Your name"
                    onChange={(e) => this.props.setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="u-br-gr"
                    placeholder="Your email"
                    onChange={(e) => this.props.setEmail(e.target.value)}
                    required
                  />
                </div>
              )}

              <input
                type="text"
                placeholder="e.g., How can I create a successful survet form?"
                className="u-br-gr u-margin-bt-2"
                value={this.props.title}
                onChange={(e) => this.props.setTitle(e.target.value)}
                required
              />
              <ReactQuill
                style={{ height: "90%" }}
                theme="snow"
                value={this.props.content}
                onChange={this.props.setContent}
                required
              />
            </div>
            <div className="new-question-helper-field">
              <span className="u-blue-text u-fs-2 field-title">
                Let Us Help You Better
              </span>
              <div className="new-question-field">
                <input
                  className="u-br-gr"
                  placeholder="e.g http://www.domain.com/contact.html"
                  value={this.props.helperUrl}
                  onChange={(e) => this.props.setHelperUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="new-question-helper-field">
              <span className="u-blue-text u-fs-2 field-title">
                Upload a Screenshot
              </span>
              <div className="new-question-field">
                <input
                  className="u-br-gr"
                  type="file"
                  onChange={handleImageAsFile}
                />
              </div>
            </div>
            <div className="new-question-post">
              <input
                type="submit"
                className="bttn bttn-ask"
                value={
                  this.props.isEdited ? "Update Question" : "Post Question"
                }
              ></input>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

NewQuestion.defaultProps = {
  avatarUrl: process.env.REACT_APP_AVATAR_URL,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    username: state.newQuestion.username,
    email: state.newQuestion.email,
    title: state.newQuestion.title,
    content: state.newQuestion.content,
    helperUrl: state.newQuestion.helperUrl,
    imageAsFile: state.newQuestion.imageAsFile,
    isEdited: state.newQuestion.isEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckState: () => dispatch(actions.authCheckState()),
    setUsername: (newUsername) =>
      dispatch(actions.setNewQuestionUsername(newUsername)),
    setEmail: (newEmail) => dispatch(actions.setNewQuestionEmail(newEmail)),
    setTitle: (newTitle) => dispatch(actions.setNewQuestionTitle(newTitle)),
    setContent: (newTitle) => dispatch(actions.setNewQuestionContent(newTitle)),
    setHelperUrl: (newTitle) =>
      dispatch(actions.setNewQuestionHelperUrl(newTitle)),
    setImageAsFile: (newTitle) =>
      dispatch(actions.setNewQuestionImageAsFile(newTitle)),
    postQuestion: (
      username,
      email,
      avatarUrl,
      title,
      content,
      helperUrl,
      imageAsFile,
      isEdit,
      questionID
    ) =>
      dispatch(
        actions.postNewQuestion(
          username,
          email,
          avatarUrl,
          title,
          content,
          helperUrl,
          imageAsFile,
          isEdit,
          questionID
        )
      ),
    getQuestion: (questionId) =>
      dispatch(actions.getEditedQuestion(questionId)),
    isEdit: (edit) => dispatch(actions.setIsEdit(edit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
