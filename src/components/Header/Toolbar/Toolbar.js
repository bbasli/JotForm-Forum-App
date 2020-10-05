import React from "react";
import { connect } from "react-redux";

import "./Toolbar.css";
import Logo from "../Logo/Logo";
import NavBar from "../NavBar/NavBar";

const toolbar = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let userLogo = null;
  if (user !== null)
    userLogo = (
      <Logo
        src={user.avatarUrl}
        alt="User-Logo"
        // eslint-disable-next-line
        style="Avatar"
      />
    );
  else {
    userLogo = <a href="/">Login</a>;
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
        <NavBar />
        {userLogo}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(toolbar);
