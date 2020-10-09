import React from "react";
import { connect } from "react-redux";

import "./Header.css";
import Toolbar from "./Toolbar/Toolbar";
import SearchBar from "./SearchBar/SearchBar";
import SubHeader from "./SubHeader/SubHeader";

const header = (props) => {
  let headerStyle = "Header-logout";
  if (props.user !== null) headerStyle = "Header-login";
  return (
    <div className={headerStyle}>
      <Toolbar/>
      <SubHeader showSearchBar={props.showSearchBar} type={props.type}>
        <SearchBar setQuestions={props.setQuestions} />
      </SubHeader>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(header);
