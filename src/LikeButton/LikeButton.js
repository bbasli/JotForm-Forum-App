import React, { useState, useEffect } from "react";
import axios from "axios";

const LikeButton = (props) => {
  const likedUsers = JSON.parse(props.likeList);
  const [likedBefore, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likedUsers.length);

  useEffect(() => {
    if (likedUsers.length > 0 && props.user !== null) {
      setLiked(
        likedUsers.filter((likedUser) => {
          return likedUser === props.user.username;
        }).length > 0
          ? true
          : false
      );
    }
  }, [likedUsers, props.user]);

  let isEnable = true;
  if (props.user !== null)
    if (props.user.username !== props.submissionOwner.trim()) isEnable = false;

  const updateLike = () => {
    let updatedLikedList = null;

    if (!likedBefore) {
      if (likedUsers === 0) updatedLikedList = [props.user.username];
      else updatedLikedList = [...likedUsers, props.user.username];
      setLikeCount(likeCount + 1);
    } else {
      updatedLikedList = likedUsers.filter(
        (user) => user !== props.user.username
      );
      setLikeCount(likeCount - 1);
    }
    updatedLikedList = JSON.stringify(updatedLikedList);

    let subNo = "submission[17]=";
    if (props.submissionType === "Answered on") subNo = "submission[11]=";
    axios
      .post(
        "https://api.jotform.com/submission/" +
          props.submissionID +
          "?apiKey=" +
          process.env.REACT_APP_APP_KEY,
        subNo + updatedLikedList
      )
      .then((response) => {
        setLiked(!likedBefore);
      });
  };
  return (
    <div className="u-fs-2 like-button">
      <button className="" onClick={() => updateLike()} disabled={isEnable}>
        {likedBefore ? (
          <i className="fas fa-heart liked"></i>
        ) : (
          <i className="far fa-heart"></i>
        )}
      </button>
      {likeCount === 0 ? "" : likeCount}
    </div>
  );
};

export default LikeButton;
