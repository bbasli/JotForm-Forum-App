import React from "react";
import axios from "axios";

import "./Body.css";
import JFSupport from "../../containers/JFSupport/JFSupport";
import JFArticles from "../../containers/JFSupport/JFArticles";

const body = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="Body">
      <div className="Part-one">
        <JFSupport user={props.user} />
        <JFArticles />
      </div>
      <div className="Part-two">
        <div className="MyQButton">
          <button
            className="MyQuestion"
            onClick={() => getMyQuestions(user.username, props.setQuestions)}
          >
            My Questions
          </button>
        </div>
        <div className="MyQuestionDiv">
          <span>Recent Questions</span>
          {props.children}
        </div>
      </div>
    </div>
  );
};

const getMyQuestions = (username, setQuestions) => {
  const apiKey = process.env.REACT_APP_APP_KEY;
  const formID = process.env.REACT_APP_QUESTION_FORM_ID;
  axios
    .get(
      "https://api.jotform.com/form/" + formID + "/submissions?apiKey=" + apiKey
    )
    .then((response) => {
      if (response.status === 200) {
        let data = response.data.content;
        let filteredData = data.filter((question) => {
          let name = question.answers[3].answer.first;
          if (
            question.answers[3].answer.last !== "" &&
            question.answers[3].answer.last !== undefined
          )
            name += " " + question.answers[3].answer.last;
          return name === username;
        });
        //console.log("Filtered Data:", filteredData);
        setQuestions(filteredData);
      }
    });
};

export default body;
