import React from "react";

import "./Header.css";
import Toolbar from "./Toolbar/Toolbar";
import SearchBar from "./SearchBar/SearchBar";
import SubHeader from "./SubHeader/SubHeader";

const header = (props) => {
  return (
    <div className="Header">
      <Toolbar />
      <SubHeader showSearchBar={props.showSearchBar}>
        <SearchBar setQuestions={props.setQuestions} />
      </SubHeader>
    </div>
  );
};

export default header;
