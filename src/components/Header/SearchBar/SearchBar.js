import React, { useState } from "react";
import { connect } from "react-redux";

import "./SearchBar.css";
import Logo from "../Logo/Logo";
import * as actions from "../../../store/actions/index";

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const getSearchedQuestion = () => {
    let data = props.allQuestions;
    let filteredData = data.filter((question) => {
      const title = question.answers[5].answer.toLowerCase().trim();
      return title.indexOf(searchInput.toLowerCase()) >= 0;
    });
    props.fetchQuestionsSuccess(filteredData);
    props.fetchTotalQuestionCountSuccess(filteredData.length);
    if (searchInput === "") {
      props.fetchQuestions(0, props.questionPerPage);
    }
    setSearchInput("");
  };

  return (
    <div className="SearchBar">
      <Logo
        src="https://www.jotform.com/wepay/assets/img/podo.png?v=1.0.0.0"
        alt="JF-podo"
        // eslint-disable-next-line
        style="Jf-podo"
      />
      <div className="Search">
        <input
          type="text"
          name="search"
          placeholder="Search Question"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <button onClick={() => getSearchedQuestion()}>
          <i className="fas fa-search" style={{ marginRight: "3px" }}></i>
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    questionPerPage: state.questions.questionPerPage,
    totalQuestionCount: state.questions.totalQuestionCount,
    allQuestions: state.questions.all_questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestionsSuccess: (newQuestions) =>
      dispatch(actions.fetchQuestionsSuccess(newQuestions)),
    fetchTotalQuestionCountSuccess: (newQuestionCount) =>
      dispatch(actions.fetchTotalQuestionCountSuccess(newQuestionCount)),
    fetchQuestions: (pageNumber, questionPerPage) =>
      dispatch(actions.fetchQuestions(pageNumber, questionPerPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
