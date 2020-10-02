import React from "react";

import "./NewAnswer.css";

const newAnswer = (props) => (
  <div className="Your-answer">
    <span>Your Answer</span>
    <textarea value={props.content} onChange={props.answerHandler}></textarea>
    <div className="YAButton">
      <button onClick={props.post}>Post Answer</button>
    </div>
  </div>
);

export default newAnswer;
