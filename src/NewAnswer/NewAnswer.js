import React from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uuid from "react-uuid";

import * as actions from "../store/actions/index";

const NewAnswer = (props) => {
  const handleImageAsFile = (event) => {
    const image = event.target.files[0];
    props.setImageAsFile(image);
  };

  const submit = (e) => {
    e.preventDefault();
    let imageId = uuid();
    if (props.imageAsFile === "") imageId = "";
    let submission = [
      {
        3: props.content,
        4: { first: props.username, last: "" },
        6: process.env.REACT_APP_AVATAR_URL,
        7: props.questionID,
        8: props.email,
        9: imageId,
      },
    ];
    if (props.user !== null)
      submission = [
        {
          ...submission[0],
          4: { first: props.user.username },
          6: props.user.avatarUrl,
        },
      ];

    props.postAll(
      props.questionID,
      imageId,
      props.imageAsFile,
      submission,
      props.replyCount,
      props.fetchAnswers
    );
  };

  return (
    <div className="user-card">
      <form onSubmit={submit}>
        <div className="Your-answer">
          <div className="unlogged-user-container">
            <div>
              <span className="u-blue-text u-fs-2">Your Name</span>
              <input
                type="text"
                className="u-br-gr"
                onChange={(e) => props.setUsername(e.target.value)}
              />
            </div>
            <div>
              <span className="u-blue-text u-fs-2">Your Email</span>
              <input
                type="text"
                className="u-br-gr"
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </div>
          </div>
          <span className="u-blue-text u-fs-2">Your Answer</span>
          <div className="editor">
            <ReactQuill
              style={{ height: "90%" }}
              theme="snow"
              value={props.content}
              onChange={props.setContent}
              required
            />
          </div>
          <input type="file" onChange={handleImageAsFile} />
          <div className="u-text-align-r">
            <input
              type="submit"
              value="Post Answer"
              className="bttn bttn-post"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

NewAnswer.defaultProps = {
  replyCount: 0,
};

const mapStateToProps = (state) => {
  return {
    content: state.newAnswer.content,
    username: state.newAnswer.username,
    email: state.newAnswer.email,
    imageAsFile: state.newAnswer.imageAsFile,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setContent: (newContent) => dispatch(actions.setContent(newContent)),
    setUsername: (newUsername) => dispatch(actions.setUsername(newUsername)),
    setEmail: (newEmail) => dispatch(actions.setEmail(newEmail)),
    setImageAsFile: (newFile) => dispatch(actions.setImageAsFile(newFile)),
    postAll: (
      questionID,
      uniqueImgID,
      imageAsFile,
      newAnswer,
      replyCount,
      updateAnswers
    ) =>
      dispatch(
        actions.postAll(
          questionID,
          uniqueImgID,
          imageAsFile,
          newAnswer,
          replyCount,
          updateAnswers
        )
      ),
    fetchAnswers: () => dispatch(actions.fetchAnswers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAnswer);
