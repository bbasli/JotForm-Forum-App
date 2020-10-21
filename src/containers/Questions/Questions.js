import React from "react";

import Question from "./Question/Question";

const questions = (props) => {
  const questions = props.questions;
  let data = null;
  if (questions.length > 0) {
    data = questions;
    data = questions.map((question) => {
      let name = question.answers[3].answer.first;
      if (
        question.answers[3].answer.last !== "" &&
        question.answers[3].answer.last !== undefined
      )
        name += " " + question.answers[3].answer.last;
      return (
        <Question
          key={question.id}
          id={question.id}
          title={question.answers[5].answer}
          name={name}
          created_at={question.created_at}
          updated_at={question.answers[18].answer}
          replyCount={question.answers[9].answer}
          isSolved={question.answers[15].answer}
        />
      );
    });
  }
  return <div>{data}</div>;
};

export default questions;
