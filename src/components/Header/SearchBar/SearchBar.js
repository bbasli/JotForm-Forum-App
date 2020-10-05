import React, { useState } from "react";
import axios from "axios";

import "./SearchBar.css";
import Logo from "../Logo/Logo";

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");

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
        <button onClick={() => getSearchedQuestion(searchInput, props.setQuestions)}>
          <i className="fas fa-search" style={{ marginRight: "3px" }}></i>
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

const getSearchedQuestion = (searchInput, setQuestions) => {
  const apiKey = process.env.REACT_APP_APP_KEY;
  const formID = process.env.REACT_APP_QUESTION_FORM_ID;
  axios
    .get(
      "https://api.jotform.com/form/" + formID + "/submissions?apiKey=" + apiKey
    )
    .then((response) => {
      if (response.status === 200) {
        let data = response.data.content;
        let filteredData = data.filter((question) => {
          const title = question.answers[5].answer.toLowerCase().trim();
          return title.indexOf(searchInput.toLowerCase()) >= 0;
        });
        //console.log("Filtered Data:", filteredData);
        setQuestions(filteredData);
      }
    });
};

export default SearchBar;
