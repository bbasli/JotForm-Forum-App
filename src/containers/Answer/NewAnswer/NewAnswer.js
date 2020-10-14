import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./NewAnswer.css";
import * as actions from "../../../store/actions/index";

const NewAnswer = (props) => {
  const [answer, setAnswer] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  let modal = null;
  if (props.user === null)
    modal = (
      <div className="user">
        <div className="fields">
          <label>Your name</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="fields">
          <label>Your email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
    );

  const postDataHandler = (event) => {
    event.preventDefault();
    if (answer === "") {
      alert("You have to fill your answer!!!");
      return;
    }
    let submission = null;
    if (props.user !== null)
      submission = [
        {
          3: answer,
          4: { first: props.user.username, last: "" },
          6: props.user.avatarUrl,
          7: props.questionID,
        },
      ];
    else {
      submission = [
        {
          3: answer,
          4: { first: username, last: "" },
          6: process.env.REACT_APP_AVATAR_URL,
          7: props.questionID,
          8: email,
        },
      ];
    }

    axios
      .put(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_ANSWER_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY,
        submission
      )
      .then(
        (response) => {
          if (response.status === 200) {
            const replyCount = parseInt(props.replyCount) + 1;
            axios
              .post(
                "https://api.jotform.com/submission/" +
                  props.questionID +
                  "?apiKey=" +
                  process.env.REACT_APP_APP_KEY,
                "submission[9]=" + replyCount
              )
              .then((rsp) => {
                if (rsp.status === 200) {
                  //console.log("Reply Count Response", rsp);
                  window.location.href("/");
                }
              });
          }
        },
        (error) => {
          console.log("Error ", error);
        }
      );
  };

  return (
    <form onSubmit={postDataHandler}>
      <div className="Your-answer">
        {modal}
        <div>
          <label>Your Answer</label>
          <div className="editor">
            <ReactQuill
              style={{ height: "90%" }}
              theme="snow"
              value={answer}
              onChange={setAnswer}
            />
          </div>
          <div className="YAButton">
            <input type="submit" value="Post Answer" />
          </div>
        </div>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAnswers: (newAnswer) => dispatch(actions.fetchAnswers(newAnswer)),
  };
};

export default connect(null, mapDispatchToProps)(NewAnswer);
