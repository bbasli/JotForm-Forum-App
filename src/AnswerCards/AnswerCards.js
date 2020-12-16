import React from "react";

import AnswerCard from "../AnswerCard/AnswerCard";

const AnswerCards = (props) => {
  return props.answers
    .filter((answer) => {
      return answer.answers[7].answer === props.questionId;
    })
    .map((answer) => <AnswerCard answer={answer} key={answer.id} />)
    .reverse();
};

export default AnswerCards;
