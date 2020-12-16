import React from "react";

import UserCard from "../UserCard/UserCard";

const QuestionCard = (props) => {
  return (
    <UserCard
      id={props.question.id}
      username={props.question.answers[3].prettyFormat}
      avatarUrl={props.question.answers[10].answer}
      type="Asked on"
      created_at={props.question.created_at}
      content={props.question.answers[6].answer}
      helperUrl={props.question.answers[7].answer}
      ssUrl={props.question.answers[14].answer}
      likeList={props.question.answers[17].answer}
      isSolved={props.question.answers[15].answer}
    />
  );
};

export default QuestionCard;
