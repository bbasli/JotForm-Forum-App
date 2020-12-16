import React from "react";
const Heading = (props) => (
  <div className="heading-home" onClick={() => (window.location.href = "/")}>
    <h1 className="heading-home-primary-main">{props.mainHeading}</h1>
    <h1 className="heading-home-primary-sub">{props.subHeading}</h1>
  </div>
);

export default Heading;
