import React from "react";

import "./SideDrawer.css";
import NavBar from "../Header/NavBar/NavBar";
import Logo from "../Header/Logo/Logo";

const sideDrawer = (props) => {
  let visible = "Closed";
  if (props.openModal) visible = "Opened";
  let userContainer = null;
  if (props.user !== null)
    userContainer = (
      <div className="UserBottomContainer">
        <div className="UserInfoBottom">
          <Logo
            src={props.user.avatarUrl}
            alt="User-Logo"
            // eslint-disable-next-line
            style="Avatar"
          />
          &nbsp;
          <span>
            Hello <strong>{props.user.username}</strong>
          </span>
        </div>
        <span className="User-type">{props.accountType}</span>
      </div>
    );
  else
    userContainer = (
      <div className="dropdown">
        <button onClick={() => props.auth()} className="dropbtn">
          Login
        </button>
      </div>
    );
  return (
    <div className={"SideDrawer " + visible}>
      <div className="TopSide">
        <Logo
          src="https://www.jotform.com/resources/assets/svg/jotform-logo-transparent.svg"
          alt="JF-Logo"
          url="https://www.jotform.com/"
          // eslint-disable-next-line
          style="Jf-logo"
        />
        <i className="fas fa-times" onClick={() => props.setVisible(false)}></i>
      </div>
      <NavBar />
      {props.user !== null ? (
        <div className="dropdown">
          <button onClick={() => props.logout()} className="dropbtn">
            Logout
          </button>
        </div>
      ) : null}
      {userContainer}
    </div>
  );
};

export default sideDrawer;
