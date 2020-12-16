import React from "react";

const NotLoggedInDropdown = (props) => (
  <div className="dropdown">
    <button className="dropbtn" onClick={() => props.login()}>
      Login
    </button>
    <div className="dropdown-content"></div>
  </div>
);

export default NotLoggedInDropdown;
