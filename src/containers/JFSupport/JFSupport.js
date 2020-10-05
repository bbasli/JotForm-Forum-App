import React from "react";
import { NavLink } from "react-router-dom";

const jfSupport = (props) => {
  return (
    <div>
      <button className="Ask">
        <NavLink
          to={{
            pathname: "/new-question",
          }}
          style={{ textDecoration: "none", color: "white" }}
        >
          Ask your question
        </NavLink>
      </button>
      <p>
        At JotForm, we want to make sure that you’re getting the online form
        builder help that you need. Our friendly customer support team is
        available 24/7.
        <br />
        <br />
        We believe that if one user has a question, there could be more users
        who may have the same question. This is why many of our support forum
        threads are public and available to be searched and viewed. If you’d
        like help immediately, feel free to search for a similar question, or
        submit your question or concern.
      </p>
    </div>
  );
};

export default jfSupport;
