import React from "react";

const SolvedButton = (props) => {
  const param = props.isSolved === "0" ? "1" : "0";
  return (
    <div className="u-margin-bt-2">
      <p>
        <strong>
          If your problem is solved, please click the button and mark it as
          solved.
        </strong>
      </p>
      <button className="bttn bttn-ask" onClick={() => props.clicked(param)}>
        {props.isSolved !== "0" ? "Solved" : "Unsolved"}
      </button>
    </div>
  );
};

SolvedButton.defaultProps = {
  isSolved: "0",
};

export default SolvedButton;
