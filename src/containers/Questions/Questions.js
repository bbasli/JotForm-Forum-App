import React from "react";

import Question from "./Question/Question";

const questions = (props) => {
  const questions = props.questions;
  let data = null;
  if (questions.length > 0) {
    if (!props.showMyQuestions) {
      data = questions.map((question) => {
        let name = question.answers[3].answer.first;
        if (
          question.answers[3].answer.last !== "" &&
          question.answers[3].answer.last !== undefined
        )
          name += " " + question.answers[3].answer.last;
        if (question.status === "ACTIVE")
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
              ssUrl={question.answers[8].answer}
              apiKey={props.apiKey}
              user={props.user}
            />
          );
          else return null;
      });
    }
    if (props.showMyQuestions) {
      data = questions
        .filter((question) => {
          let name = question.answers[3].answer.first;
          if (
            question.answers[3].answer.last !== "" &&
            question.answers[3].answer.last !== undefined
          )
            name += " " + question.answers[3].answer.last;
          return name === props.user.username;
        })
        .map((question) => {
          let name = question.answers[3].answer.first;
          if (
            question.answers[3].answer.last !== "" &&
            question.answers[3].answer.last !== undefined
          )
            name += " " + question.answers[3].answer.last;
          return (
            <Question
              key={question.id}
              title={question.answers[5].answer}
              name={name}
              content={question.answers[6].answer}
              created_at={question.created_at}
              replyCount={"0"}
              helperUrl={question.answers[7].answer}
              ssUrl={question.answers[8].answer}
            />
          );
        });
    } else if (props.search) {
      data = questions
        .filter((question) => {
          const title = question.answers[5].answer.toLowerCase().trim();
          //console.log(title.indexOf(props.target.toLowerCase()) >= 0);
          return title.indexOf(props.target.toLowerCase()) >= 0;
        })
        .map((question) => {
          let name = question.answers[3].answer.first;
          if (
            question.answers[3].answer.last !== "" &&
            question.answers[3].answer.last !== undefined
          )
            name += " " + question.answers[3].answer.last;
          return (
            <Question
              key={question.id}
              title={question.answers[5].answer}
              name={name}
              content={question.answers[6].answer}
              created_at={question.created_at}
              replyCount={"0"}
              helperUrl={question.answers[7].answer}
              ssUrl={question.answers[8].answer}
            />
          );
        });
    }
  }

  return <div>{data}</div>;
};

export default questions;
