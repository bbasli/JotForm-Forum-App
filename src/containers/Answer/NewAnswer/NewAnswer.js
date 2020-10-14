import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./NewAnswer.css";
import * as actions from "../../../store/actions/index";

const NewAnswer = (props) => {
  const [answer, setAnswer] = useState("");

  const postDataHandler = () => {
    console.log("POST", answer);
    const submisson = [
      {
        3: answer,
        4: { first: props.user.username, last: "" },
        6: props.user.avatarUrl,
        7: props.questionID,
      },
    ];

    axios
      .put(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_ANSWER_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY,
        submisson
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
    <div className="Your-answer">
      <span style={{ marginBottom: "15px" }}>Your Answer</span>
      <div className="editor">
        <ReactQuill
          style={{ height: "90%" }}
          theme="snow"
          value={answer}
          onChange={setAnswer}
        />
      </div>
      <div className="YAButton">
        <button onClick={postDataHandler}>Post Answer</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAnswers: (newAnswer) => dispatch(actions.fetchAnswers(newAnswer)),
  };
};

export default connect(null, mapDispatchToProps)(NewAnswer);
