import React from "react";

import "./Logo.css";

const logo = (props) => {
  let logo = null;
  if (props.url)
    logo = (
      <a href="https://www.jotform.com/" target="blank">
        <img src={props.src} alt={props.alt} className={props.style} />
      </a>
    );
  else logo = <img src={props.src} alt={props.alt} className={props.style} />;

  return <div className="Logo">{logo}</div>;
};

export default logo;
