import React from "react";

import { connect } from "react-redux";

import EditButton from "../EditButton/EditButton";
import LikeButton from "../LikeButton/LikeButton";
import HelperImage from "../HelperImage/HelperImage";

const UserCard = (props) => {
  const parseDate = (created_at) => {
    if (created_at.length > 0) {
      const dates = new Date();
      dates.setHours(dates.getHours() + 7);
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
  return (
    <div className="user-card">
      <div className="user-card-info-box">
        <img src={props.avatarUrl} alt="user-avatar" />
        <div className="user-card-question-time-owner">
          <strong>{props.username}</strong>
          {props.type} {parseDate(props.created_at)}
        </div>
        {props.type === "Asked on" ? (
          <i
            className={
              "fas fa-check u-abs-rt u-fs-3 u-question-" +
              (props.isSolved !== "0" ? "solved" : "unsolved")
            }
          ></i>
        ) : null}
      </div>
      <div className="user-card-content">
        <div
          className="user-card-content-text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
        {props.helperUrl !== "" ? (
          <div>
            <strong>Page URL:</strong>
            <br />
            <a href={props.helperUrl} target="blank">
              {props.helperUrl}
            </a>
          </div>
        ) : null}
        <HelperImage ssUrl={props.ssUrl} />
        <div className="user-card-features u-abs-rb u-dp-fl">
          <LikeButton
            likeList={props.likeList}
            user={props.user}
            submissionType={props.type}
            submissionID={props.id}
            submissionOwner={props.username}
          />
          &nbsp;&nbsp;
          {props.user !== null ? (
            props.user.username === props.username.trim() ? (
              <div>
                <EditButton id={props.id} type={props.type} />
              </div>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  );
};

UserCard.defaultProps = {
  avatarUrl: process.env.REACT_APP_AVATAR_URL,
  helperUrl: "",
  likeList: "0",
  isSolved: "0",
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(UserCard);
