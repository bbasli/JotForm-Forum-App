import React from "react";
import { Link } from "react-router-dom";

import "./Question.css";

const question = (props) => {
  const calculateElapsedTime = (created_at, updated_at) => {
    let lastModified = created_at;
    if (updated_at !== null) lastModified = updated_at;
    let currentTime = new Date();
    lastModified = new Date(lastModified);
    lastModified.setHours(lastModified.getHours() + 7);
    const elapsedDay =
      (currentTime.getTime() - lastModified.getTime()) / (1000 * 3600 * 24);
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
  return (
    <div className="Question">
      <div className="Replies">
        <p>
          <b>{props.replyCount === undefined ? "0" : props.replyCount}</b>
        </p>
        <p>REPLIES</p>
      </div>
      <div className="Content">
        <div className="SubContent">
          <Link
            to={{
              pathname: "/answers/" + props.id,
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <p>{props.title}</p>
          </Link>
          <p style={{ color: "#b7b7c3", fontSize: "12px" }}>
            Asked by &nbsp;<strong>{props.name}</strong>
          </p>
        </div>
        <div>
          <p style={{ color: "#b7b7c3", fontSize: "12px" }}>
            {calculateElapsedTime(props.created_at, props.updated_at)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default question;
