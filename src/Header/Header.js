import React from "react";

import Toolbar from "../Toolbar/Toolbar";

const Header = (props) => {
  return (
    <header className="header">
      <div className="header-home">
        <Toolbar />
        {props.children}
      </div>
    </header>
  );
};

export default Header;
