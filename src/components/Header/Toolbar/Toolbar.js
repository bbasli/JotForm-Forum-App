import React from "react";

import "./Toolbar.css";
import Logo from "../Logo/Logo";
import NavBar from "../NavBar/NavBar";

const toolbar = (props) => (
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
      {props.avatar}
    </div>
  </div>
);

export default toolbar;
