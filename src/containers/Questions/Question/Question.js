import React from "react";
import { Link } from "react-router-dom";

import "./Question.css";

const question = (props) => {
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
            Updated 1 minute ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default question;
