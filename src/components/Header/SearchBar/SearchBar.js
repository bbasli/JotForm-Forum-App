import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./SearchBar.css";
import Logo from "../Logo/Logo";
import * as actions from "../../../store/actions/index";

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const getSearchedQuestion = () => {
    axios
      .get(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_QUESTION_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY +
          '&limit=9999&filter={"status:ne":"DELETED"}'
      )
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.content;
          let filteredData = data.filter((question) => {
            const title = question.answers[5].answer.toLowerCase().trim();
            return title.indexOf(searchInput.toLowerCase()) >= 0;
          });
          props.fetchQuestionsSuccess(filteredData);
          props.fetchTotalQuestionCountSuccess(filteredData.length);
          if (searchInput === "") {
            props.fetchTotalQuestionCount();
            props.fetchQuestions(0, props.questionPerPage);
          }
          setSearchInput("");
        }
      });
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestionsSuccess: (newQuestions) =>
      dispatch(actions.fetchQuestionsSuccess(newQuestions)),
    fetchTotalQuestionCountSuccess: (newQuestionCount) =>
      dispatch(actions.fetchTotalQuestionCountSuccess(newQuestionCount)),
    fetchTotalQuestionCount: () => dispatch(actions.fetchTotalQuestionCount()),
    fetchQuestions: (pageNumber, questionPerPage) =>
      dispatch(actions.fetchQuestions(pageNumber, questionPerPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
