import React, { useState } from "react";
/* import { Button, Modal } from "react-bootstrap";
 */import { connect } from "react-redux";


import AskButton from "../AskButton/AskButton";
import * as actions from "../store/actions/index";

const HomeButtons = (props) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const myQuestionClickHandler = () => {
    if (props.user === null) handleShow();
    else {
      props.fetchQuestions(0, null, props.myQuestion, props.user.username);
      props.setMyQuestion(!props.myQuestion);
    }
  };

  return (
    <div className="buttons">
      <AskButton />
      <button
        className="bttn bttn-my-question"
        onClick={myQuestionClickHandler}
      >
        {props.myQuestion ? "all questions" : "my questions"}
      </button>
{/*       <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, You have to login to see your questions!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.login();
              handleClose();
            }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(actions.auth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeButtons);
