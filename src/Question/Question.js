import React from "react";
import { Link } from "react-router-dom";

import "./Question.css";

const question = (props) => {
  const calculateElapsedTime = (updated_at) => {
    const elapsedDay =
      (new Date().getTime() - updated_at) / (1000 * 3600 * 24);
    const elapsedHour = elapsedDay * 24;
    let elapsedMin = elapsedHour * 60;

    if (parseInt(elapsedDay) > 0)
      return "Updated " + parseInt(elapsedDay) + " days ago";
    else if (parseInt(elapsedHour) > 0)
      return "Updated " + parseInt(elapsedHour) + " hours ago";
    else {
      if (parseInt(elapsedMin) === 0) elapsedMin = 1;
      return "Updated " + parseInt(elapsedMin) + " minutes ago";
    }
  };
  let title = props.title;
  if (title.length > 66) title = title.substring(0, 66) + "...";
  return (
    <div className="question-box">
      <div className="question-reply-count-box">
        <p className="reply-count">
          <b>{props.replyCount}</b>
        </p>
        <p className="reply-text">REPLIES</p>
      </div>
      <div className="question-info-box">
        <Link to={"/answers/" + props.id}>
          <p className="question-title">
            ({props.isSolved === "1" ? <strong>S</strong> : <strong>U</strong>}
            )&nbsp;{title}
          </p>
        </Link>
        <p className="question-owner">
          Asked by <strong>{props.name}</strong>
        </p>
      </div>
      <div className="question-elapsed-time-box">
        <p className="question-elapsed-time-text">
          {calculateElapsedTime(props.updated_at)}
        </p>
      </div>
    </div>
  );
};

question.defaultProps = {
  replyCount: "0",
  isSolved: "0",
};

export default question;
