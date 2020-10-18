import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import "./Body.css";
import JFSupport from "../../containers/JFSupport/JFSupport";
import JFArticles from "../../containers/JFSupport/JFArticles";
import * as actions from "../../store/actions/index";

const Body = (props) => {
  const [isMyQuestions, toggleButton] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getMyQuestions = () => {
    if (props.user !== null) {
      axios
        .get(
          "https://api.jotform.com/form/" +
            process.env.REACT_APP_QUESTION_FORM_ID +
            "/submissions?apiKey=" +
            process.env.REACT_APP_APP_KEY +
            "&filtering={'status:ne':'DELETED'}"
        )
        .then((response) => {
          if (response.status === 200) {
            let data = response.data.content;
            let filteredData = data.filter((question) => {
              let name = question.answers[3].answer.first;
              if (
                question.answers[3].answer.last !== "" &&
                question.answers[3].answer.last !== undefined
              )
                name += " " + question.answers[3].answer.last;
              return name === props.user.username;
            });
            if (filteredData.length > 0 && isMyQuestions) {
              props.fetchQuestionsSuccess(filteredData);
              props.fetchTotalQuestionCountSuccess(filteredData.length);
              toggleButton(!isMyQuestions);
            } else {
              alert("You have no question");
              props.fetchTotalQuestionCount();
              props.fetchQuestions(0, props.questionPerPage);
            }
          }
        });
    } else handleShow();
  };

  const login = () => {
    props.auth();
    handleClose();
  }

  return (
    <div className="Body">
      <div className="Body-top">
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
        <div className="MyQButton">
          <button className="MyQuestion" onClick={() => getMyQuestions()}>
            {isMyQuestions ? "My Questions" : "All Questions"}
          </button>
        </div>
      </div>
      <div className="Parts">
        <div className="Part-one">
          <JFSupport />
          <JFArticles />
        </div>
        <div className="Part-two">
          <div className="MyQuestionDiv">
            <span>Recent Questions</span>
            {props.children}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, You have to login to see your questions!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={login}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    questionPerPage: state.questions.questionPerPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestionsSuccess: (newQuestions) =>
      dispatch(actions.fetchQuestionsSuccess(newQuestions)),
    fetchTotalQuestionCountSuccess: (newQuestionCount) =>
      dispatch(actions.fetchTotalQuestionCountSuccess(newQuestionCount)),
    fetchTotalQuestionCount: () => dispatch(actions.fetchTotalQuestionCount()),
    fetchQuestions: (pageNumber, questionPerPage) =>
      dispatch(actions.fetchQuestions(pageNumber, questionPerPage)),
    auth: () => dispatch(actions.auth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
