import React from "react";

import "./SubHeader.css";

const subHeader = (props) => {
  return (
    <div className="SubHeader">
      <div className="Text">
        <h1>Form Support</h1>
        <p>
          Search our library of answered support questions, or submit your own.
        </p>
      </div>
      {props.children}
    </div>
  );
};

export default subHeader;
