import React from "react";

import Question from "./Question/Question";

const questions = (props) => {
  const questions = props.questions;
  let data = null;
  if (questions.length > 0) {
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
          content={question.answers[6].answer}
          created_at={question.created_at}
          replyCount={question.answers[9].answer}
          helperUrl={question.answers[7].answer}
          ssUrl={question.answers[11].answer}
        />
      );
    });
  }
  return <div>{data}</div>;
};

export default questions;
