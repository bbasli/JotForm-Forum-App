import React from "react";

import "./Logo.css";

const logo = (props) => {
  let logo = null;
  let source = props.src;
  if(props.src === undefined)
    source = process.env.REACT_APP_AVATAR_URL;
  if (props.url)
    logo = (
      <a href="https://www.jotform.com/" target="blank">
        <img src={source} alt={props.alt} className={props.style} />
      </a>
    );
  else logo = <img src={source} alt={props.alt} className={props.style} />;

  return <div className="Logo">{logo}</div>;
};

export default logo;
