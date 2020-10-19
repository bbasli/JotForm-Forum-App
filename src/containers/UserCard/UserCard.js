import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { storage } from "../../Firebase/Firebase";
import { Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";

import "./UserCard.css";
import Logo from "../../components/Header/Logo/Logo";
import * as actions from "../../store/actions/index";

const UserCard = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const stringToHTML = function (str) {
    return { __html: str };
  };
  useEffect(() => {
    if (props.loggedUser !== null && props.likeList !== null) {
      setLikeCount(
        JSON.parse(props.likeList).length > 0
          ? JSON.parse(props.likeList).length
          : null
      );
      if (JSON.parse(props.likeList).includes(props.loggedUser.username))
        setLike(true);
    }
  }, [props.likeList, props.loggedUser]);
  const updateLike = () => {
    props.updateLikeCount(
      !like,
      props.id,
      props.type,
      props.loggedUser.username,
      props.likeList
    );
    if (!like) setLikeCount(likeCount + 1);
    else if (likeCount !== 1) setLikeCount(likeCount - 1);
    else setLikeCount(null);
    setLike(!like);
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
    else
      editButton = (
        <OverlayTrigger
          placement="right"
          delay={{ show: 100, hide: 200 }}
          overlay={
            <Tooltip id="button-tooltip">
              If you have a similar problem, click here
            </Tooltip>
          }
        >
          <div className="LikedContainer" onClick={() => updateLike()}>
            {like ? (
              <i className="fas fa-heart liked"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
            &nbsp;
            {likeCount}
          </div>
        </OverlayTrigger>
      );
  if (props.ssUrl !== null && props.ssUrl !== "" && props.ssUrl !== undefined) {
    storage
      .ref("images")
      .child(props.ssUrl)
      .getDownloadURL()
      .then((url) => {
        if (imageUrl === "") setImageUrl(url);
      });
  }
  const solvedTooltip = (
    <Tooltip id="button-tooltip">
      This question is {props.isSolved ? " solved" : " not solved"}
    </Tooltip>
  );
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
        {props.type === "Question" ? (
          <div className="IsSolved">
            <OverlayTrigger
              placement="right"
              delay={{ show: 200, hide: 300 }}
              overlay={solvedTooltip}
            >
              <i
                className={
                  props.isSolved
                    ? "fas fa-check Solved"
                    : "fas fa-check Unsolved"
                }
              ></i>
            </OverlayTrigger>
          </div>
        ) : null}
      </div>
      <div
        className="Question-content"
        dangerouslySetInnerHTML={stringToHTML(props.content)}
      />
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
      props.ssUrl === null ? null : imageUrl === "" ? (
        <Spinner animation="border" variant="success" />
      ) : (
        <div className="ImageContainer">
          <img src={imageUrl} alt="Screenshot" className="User-image" />
        </div>
      )}
      {editButton}
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

const mapStateToProps = (state) => {
  return {
    loggedUser: state.auth.user,
    isSolved: state.answers.isSolved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLikeCount: (
      isLike,
      submissionID,
      submissionType,
      username,
      likeList
    ) =>
      dispatch(
        actions.postLikedCount(
          isLike,
          submissionID,
          submissionType,
          username,
          likeList
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
