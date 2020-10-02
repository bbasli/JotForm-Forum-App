import React from "react";

import "./Body.css";
import JFSupport from "../../containers/JFSupport/JFSupport";
import JFArticles from "../../containers/JFSupport/JFArticles";

const body = (props) => (
  <div className="Body">
    <div className="Part-one">
      <JFSupport
        avatarUrl={props.avatarUrl}
        username={props.username}
        apiKey={props.apiKey}
      />
      <JFArticles />
    </div>
    <div className="Part-two">
      <div className="MyQButton">
        <button className="MyQuestion" onClick={props.showMyQuestions}>
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

export default body;
