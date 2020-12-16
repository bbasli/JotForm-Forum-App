import React from "react";

const LoggedInDropdown = (props) => {
  return (
    <div
      className="dropdown user"
      style={{ backgroundImage: `url(${props.user.avatarUrl})` }}
    >
      <div className="triangle"></div>
      <div className="dropdown-content">
        <div className="user-info-row">
          <div className="user-name-box">
            Hello&nbsp;
            <strong>{props.user.username}</strong>
          </div>
          <div className="user-account-type">{props.accountType}</div>
        </div>
        <a href="https://www.jotform.com/myaccount/settings" target="blank">
          Settings
        </a>
        <button onClick={() => props.logout()}>Logout</button>
      </div>
    </div>
  );
};

export default LoggedInDropdown;
