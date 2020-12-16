import React from "react";

const notFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found-heading-main">Page Not Found!</h1>
      <div className="not-found-router">
        <a href="/" className="not-found-router-link">
          Click
        </a>
        &nbsp;&nbsp;&nbsp;
        <h2 className="not-found-router-text"> to Home Page</h2>
      </div>
    </div>
  );
};

export default notFound;
