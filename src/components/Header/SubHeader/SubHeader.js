import React from "react";

import "./SubHeader.css";
import Logo from "../Logo/Logo";

const subHeader = (props) => {
  let subHeader = null;
  if (props.showSearchBar) {
    subHeader = (
      <div className="SubHeader">
        <div className="Text">
          <h1>Form Support</h1>
          <p>
            Search our library of answered support questions, or submit your
            own.
          </p>
        </div>
        {props.children}
      </div>
    );
  } else
    subHeader = (
      <div className="NewQuestion-SubHeader">
        <div style={{ marginTop: "129px", width: "30%" }}>
          <Logo
            src="//cdn.jotfor.ms/assets/img/memberkit/answers-create-podo.svg?v=1"
            alt="Answer-podo"
            // eslint-disable-next-line
            style="Answer-podo"
          />
          <span
            style={{
              color: "#0773EE",
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Ask Your Question
          </span>
        </div>

        <div className="SubHeader-Text">
          <strong>
            <p>Contact JotForm Support</p>
          </strong>
          <span>Our customer support team is available 24/7</span>
        </div>
      </div>
    );
  return subHeader;
};

export default subHeader;
