import React from "react";

import "./UserCard.css";
import Logo from "../../components/Header/Logo/Logo";

const userCard = (props) => {
  return (
    <div className="User-card">
      <div className="UserContainer">
        <div>
          <Logo
            src="https://www.gravatar.com/avatar/4d0dde69c7fc87cca01e743e93848938.jpg?d=https://cdn.jotfor.ms/assets/img/v4/avatar/Podo-Avatar2-04.png&r=r&s=80"
            alt="User-logo"
            // eslint-disable-next-line
            style="User-logo"
          />
        </div>
        <div className="User-info">
          <div>
            <strong>{props.username}</strong>
          </div>
          <div>
            {props.isAsked ? "Asked" : "Answered"} on
            {parseDate(props.created_at)}
          </div>
        </div>
      </div>
      <div className="Question-content">
        <p>{props.content}</p>
      </div>
      {props.helperUrl === undefined ? null : (
        <p>
          <strong>Page URL:</strong>
          <br />
          <a href={"http://"+props.helperUrl} target="blank">{props.helperUrl}</a>
        </p>
      )}
      {props.ssUrl === undefined ? null : (
        <img
          src={"data:image/png;base64,"+props.ssUrl}
          alt="ss"
          style={{ maxWidth: "540px", height: "auto" }}
        />
      )}
    </div>
  );
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
    if (hour[0] === "0") hour = hour[1];
    hour += 5;
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

export default userCard;
