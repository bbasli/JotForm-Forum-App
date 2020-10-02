import React from "react";

import "./SearchBar.css";
import Logo from "../Logo/Logo";

const searchBar = (props) => (
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
        onChange={props.searchInputHandler}
        value={props.searchInput}
      />
      <button onClick={props.search}>
        <i className="fas fa-search" style={{ marginRight: "3px" }}></i>
        <span>Search</span>
      </button>
    </div>
  </div>
);

export default searchBar;
