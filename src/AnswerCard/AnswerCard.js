import React from "react";

import UserCard from "../UserCard/UserCard";

const AnswerCard = (props) => {
  return (
    <UserCard
      id={props.answer.id}
      username={props.answer.answers[4].prettyFormat}
      avatarUrl={props.answer.answers[6].answer}
      type="Answered on"
      created_at={props.answer.created_at}
      content={props.answer.answers[3].answer}
      ssUrl={props.answer.answers[9].answer}
      likeList={props.answer.answers[11].answer}
    />
  );
};

export default AnswerCard;
