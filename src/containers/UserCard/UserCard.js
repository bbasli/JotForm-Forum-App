import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { storage } from "../../Firebase/Firebase";
import Spinner from "react-bootstrap/Spinner";

import "./UserCard.css";
import Logo from "../../components/Header/Logo/Logo";

const UserCard = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [spinner, setSpinner] = useState(null);
  const stringToHTML = function (str) {
    return { __html: str };
  };
  let editButton = null;
  if (props.loggedUser !== null)
    if (props.loggedUser.username === props.user.username)
      editButton = (
        <div className="EditContainer">
          <Link
            to={{
              pathname: "/new-question",
              aboutProps: {
                questionID: props.id,
                type: props.type,
              },
            }}
          >
            <i className="fas fa-edit"></i>
          </Link>
        </div>
      );
  if (props.ssUrl !== null && props.ssUrl !== "" && props.ssUrl !== undefined) {
    //setSpinner(<Spinner animation="border" variant="success" />);
    storage
      .ref("images")
      .child(props.ssUrl)
      .getDownloadURL()
      .then((url) => {
        if (imageUrl === "") setImageUrl(url);
        setSpinner(null);
      });
  }
  return (
    <div className="User-card">
      <div className="UserContainer">
        <div>
          <Logo
            src={props.user.avatarUrl}
            alt="User-logo"
            // eslint-disable-next-line
            style="User-logo"
          />
        </div>
        <div className="User-info">
          <div>
            <strong>{props.user.username}</strong>
          </div>
          <div>
            {props.isAsked ? "Asked" : "Answered"} on
            {parseDate(props.created_at)}
          </div>
        </div>
      </div>
      <div
        className="Question-content"
        dangerouslySetInnerHTML={stringToHTML(props.content)}
      />
      {spinner}
      {props.helperUrl === undefined || props.helperUrl === "" ? null : (
        <p>
          <strong>Page URL:</strong>
          <br />
          <a href={"http://" + props.helperUrl} target="blank">
            {props.helperUrl}
          </a>
        </p>
      )}
      {props.ssUrl === undefined ||
      props.ssUrl === "" ||
      props.ssUrl === null ? null : (
        <div style={{ display: "flex" }}>
          <img
            src={imageUrl}
            alt="Screenshot"
            style={{ minWidth: "540px", height: "auto", width: "100%" }}
          />
        </div>
      )}
      {editButton}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.auth.user,
  };
};

const parseDate = (created_at) => {
  if (created_at.length > 0) {
    let [date, hours] = created_at.split(" ");
    let [year, month, day] = date.split("-");
    let [hour, min] = hours.split(":");
    switch (month) {
      case "01":
        month = "January";
        break;
      case "02":
        month = "February";
        break;
      case "03":
        month = "March";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "June";
        break;
      case "07":
        month = "July";
        break;
      case "08":
        month = "August";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "December";
        break;
      default:
        month = "ERROR";
    }
    if (hour[0] === "0" && hour[1] !== "0") hour = hour[1];
    hour = parseInt(hour) + 7;
    hour = hour % 24;
    let AP;
    if (hour > 12) {
      AP = "PM";
      hour -= 12;
    } else AP = "AM";

    if (day[0] === "0") day = day[1];
    return (
      " " +
      month +
      " " +
      day +
      ", " +
      year +
      " at " +
      hour +
      ":" +
      min +
      " " +
      AP
    );
  }
  return "";
};

export default connect(mapStateToProps)(UserCard);
