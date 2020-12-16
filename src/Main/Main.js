import React, { useState } from "react";
import { connect } from "react-redux";

import InfoArticles from "../InfoArticles/InfoArticles";
import Questions from "../Questions/Questions";
import QuestionTabs from "../QuestionTabs/QuestionTabs";
import Paginator from "../Paginator/Paginator";
import HomeButtons from "../HomeButtons/HomeButtons";

const Main = (props) => {
  const [totalCount, setTotalCount] = useState(0);
  const [myQuestion, setMyQuestion] = useState(false);
  const [questionType, setQuestionType] = useState("All");

  if (props.totalQuestionCount > 0 && totalCount === 0) {
    setTotalCount(props.totalQuestionCount);
  }

  return (
    <main className="main-container">
      <HomeButtons myQuestion={myQuestion} setMyQuestion={setMyQuestion} />
      <div className="main">
        <InfoArticles />
        <div className="main-box">
          <h1 className="main-box-heading">Recent Questions</h1>
          <QuestionTabs setTotalCount={setTotalCount} myQuestion={myQuestion} />
          <Questions questions={props.questions} />
          <Paginator
            totalCount={totalCount}
            fetchQuestions={props.fetchQuestions}
            questionType={questionType}
            myQuestion={myQuestion}
          />
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    totalQuestionCount: state.questions.totalQuestionCount,
    questions: state.questions.questions,
    unsolvedQuestionCount: state.questions.unsolvedQuestionCount,
    solvedQuestionCount: state.questions.solvedQuestionCount,
  };
};

export default connect(mapStateToProps)(Main);
