import React from "react";

import Logo from "./Logo/Logo";
import "./Header.css";
import Toolbar from "./Toolbar/Toolbar";

const header = (props) => {
  let avatar = null;
  if (props.avatar !== "") {
    // eslint-disable-next-line
    avatar = <Logo src={props.avatar} alt="User-avatar" style="Avatar" />;
  }
  return (
    <div className="Header">
      <Toolbar avatar={avatar} />
      {props.children}
    </div>
  );
};

export default header;
