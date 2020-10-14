import React from "react";

import "./Modal.css";

const modal = (props) => (
  <div id="popup1" className="overlay">
    <div className="popup">
      <h2>Warning</h2>
      <div className="content">
        If you want to {props.action} a question to the Jotform forum, please login with
        your jotform account.
      </div>
      <button onClick={props.auth}>Login</button>
    </div>
  </div>
);

export default modal;