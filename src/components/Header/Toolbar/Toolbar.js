import React from "react";
import { connect } from "react-redux";

import "./Toolbar.css";
import Logo from "../Logo/Logo";
import NavBar from "../NavBar/NavBar";
import * as actions from "../../../store/actions/index";

const toolbar = (props) => {
  const getAccountType = (accountTypeUrl) => {
    return accountTypeUrl.substring(accountTypeUrl.lastIndexOf("/") + 1);
  };
  let userLogo = null;
  if (props.user !== null) {
    userLogo = (
      <div className="dropdown">
        <button className="logobttn">
          <Logo
            src={props.user.avatarUrl}
            alt="User-Logo"
            // eslint-disable-next-line
            style="Avatar"
          />
        </button>
        <div className="dropdown-content-last">
          <div
            className="User-top"
            onClick={() =>
              window.open("https://www.jotform.com/myaccount/", "_blank")
            }
          >
            <span>
              Hello <strong>{props.user.username}</strong>
            </span>
            &nbsp;
            <span className="User-type">
              {getAccountType(props.user.account_type)}
            </span>
          </div>
          <div className="Border-padding">
            <a href="https://www.jotform.com/myaccount/settings" target="blank">
              Settings
            </a>
          </div>
          <div className="Border-padding" onClick={props.logout}>
            Logout
          </div>
        </div>
      </div>
    );
  } else {
    userLogo = (
      <div className="dropdown">
        <button className="dropbtn" onClick={props.onAuth}>
          Login
        </button>
      </div>
    );
  }
  return (
    <div className="Toolbar">
      <Logo
        src="https://www.jotform.com/resources/assets/svg/jotform-logo-transparent.svg"
        alt="JF-Logo"
        url="https://www.jotform.com/"
        // eslint-disable-next-line
        style="Jf-logo"
      />
      <div className="NavAvatar">
        <NavBar>{userLogo}</NavBar>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: () => dispatch(actions.auth()),
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toolbar);
