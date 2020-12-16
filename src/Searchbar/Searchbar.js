import React, { useState } from "react";
import { connect } from "react-redux";

import * as actions from "../store/actions/index";

const Searchbar = (props) => {
  const [searchedText, setSearchedText] = useState("");
  return (
    <div className="header-searchbar">
      <input
        type="text"
        placeholder="Search Question"
        value={searchedText}
        onChange={(e) => setSearchedText(e.target.value)}
      />
      <button
        onClick={() => {
          props.fetchQuestions(0, null, false, null, searchedText);
          setSearchedText("");
        }}
      >
        <i
          className="fas fa-search"
          aria-hidden="true"
          style={{ fontSize: "1.6rem", fontWeight: "" }}
        ></i>
        Search
      </button>
    </div>
  );
};

const mapStateToProps = (state, action) => {
  return {
    questionPerPage: state.questions.questionPerPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestions: (
      pageNumber,
      questionPerPage,
      isSolved,
      isMyQuestion,
      username
    ) =>
      dispatch(
        actions.fetchQuestions(
          pageNumber,
          questionPerPage,
          isSolved,
          isMyQuestion,
          username
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
