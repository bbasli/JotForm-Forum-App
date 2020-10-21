import React from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "./Question.css";

const question = (props) => {
  const calculateElapsedTime = (created_at, updated_at) => {
    let lastModified = created_at;
    if (updated_at !== undefined) {
      /* console.log("UPDATED AT VAR"); */
      lastModified = updated_at;
      lastModified = new Date(lastModified);
      lastModified.setHours(lastModified.getHours() - 3);
    } else {
      /* console.log("CREATED AT VAR"); */
      lastModified = new Date(lastModified);
      lastModified.setHours(lastModified.getHours() + 7);
    }
    /*     
    console.log("Title: " + props.title, lastModified);
    console.log("updated time: " + lastModified);
    console.log("\n"); */
    return aux(lastModified);
  };
  const aux = (lastModified) => {
    const elapsedDay =
      (new Date().getTime() - lastModified.getTime()) / (1000 * 3600 * 24);
    const elapsedHour = elapsedDay * 24;
    let elapsedMin = elapsedHour * 60;
    /*     console.log(elapsedDay);
    console.log(elapsedHour);
    console.log(elapsedMin);
    console.log("\n"); */
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
  const solvedTooltip = (
    <Tooltip id="button-tooltip">
      This question is {props.isSolved === "1" ? " solved" : " unsolved"}
    </Tooltip>
  );
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
            <OverlayTrigger
              placement="top"
              delay={{ show: 200, hide: 300 }}
              overlay={solvedTooltip}
            >
              <p>
                (
                {props.isSolved === "1" ? (
                  <strong>S</strong>
                ) : (
                  <strong>U</strong>
                )}
                )&nbsp;{title}
              </p>
            </OverlayTrigger>
          </Link>
          <p style={{ color: "#b7b7c3", fontSize: "12px" }}>
            Asked by &nbsp;<strong>{props.name}</strong>
          </p>
        </div>
        <div className="ElapsedTime">
          <p style={{ color: "#b7b7c3", fontSize: "12px" }}>
            {calculateElapsedTime(props.created_at, props.updated_at)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default question;
