import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uuid from "react-uuid";
import { storage } from "../../../Firebase/Firebase";

import "./NewAnswer.css";
import * as actions from "../../../store/actions/index";

const NewAnswer = (props) => {
  const [answer, setAnswer] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imageAsFile, setImageAsFile] = useState("");

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

  const postDataHandler = (imageId = "") => {
    let submission = null;
    if (props.user !== null)
      submission = [
        {
          3: answer,
          4: { first: props.user.username, last: "" },
          6: props.user.avatarUrl,
          7: props.questionID,
          9: imageId,
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
          9: imageId,
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
            let replyCount;
            if (props.replyCount !== undefined)
              replyCount = parseInt(props.replyCount) + 1;
            else replyCount = 1;
            const date = new Date();
            axios
              .post(
                "https://api.jotform.com/submission/" +
                  props.questionID +
                  "?apiKey=" +
                  process.env.REACT_APP_APP_KEY,
                "submission[9]=" + replyCount + "&submission[18]=" + date
              )
              .then((rsp) => {
                if (rsp.status === 200) {
                  props.fetchAnswers();
                  setAnswer("");
                  setImageAsFile("");
                  return;
                }
              });
          }
        },
        (error) => {
          console.log("Error ", error);
        }
      );
  };

  const submit = (event) => {
    event.preventDefault();
    if (answer === "") {
      alert("You have to fill your answer field to post");
      return;
    }
    const imageId = uuid();
    if (imageAsFile === "") {
      postDataHandler();
    } else {
      const uploadTask = storage.ref(`/images/${imageId}`).put(imageAsFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Progress snaphot");
        },
        (error) => {
          console.error(error);
        },
        () => {
          postDataHandler(imageId);
        }
      );
    }
  };
  const handleImageAsFile = (event) => {
    const image = event.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  return (
    <form onSubmit={submit}>
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
          <input
            type="file"
            style={{ padding: "10px" }}
            onChange={handleImageAsFile}
          />
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
