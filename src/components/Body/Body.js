import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";

import "./Body.css";
import JFSupport from "../../containers/JFSupport/JFSupport";
import JFArticles from "../../containers/JFSupport/JFArticles";
import * as actions from "../../store/actions/index";
import Questions from "../../containers/Questions/Questions";

const Body = (props) => {
  const [isMyQuestions, toggleButton] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [pageOffset, setPageOffset] = useState(null);

  const getMyQuestions = (isMy, aux = false) => {
    if (props.user !== null) {
      if (isMy) {
        let data = props.allQuestions;
        let filteredData = data.filter((question) => {
          let name = question.answers[3].answer.first;
          if (
            question.answers[3].answer.last !== "" &&
            question.answers[3].answer.last !== undefined
          )
            name += " " + question.answers[3].answer.last;
          return name === props.user.username;
        });
        if (filteredData.length > 0) {
          filteredData = filteredData.sort(sortHelper);
          props.fetchQuestionsSuccess(filteredData);
          props.fetchTotalQuestionCountSuccess(filteredData.length);
          if (aux) {
            console.log("SET BUTTON FOR TOGGLE");
            toggleButton(!isMyQuestions);
          }
          return filteredData;
        } else {
          alert("You have no question");
        }
      } else {
        console.log("get other questions");
        props.fetchQuestions(0, props.questionPerPage);
        toggleButton(!isMyQuestions);
      }
    } else handleShow();
  };

  const isSolvedQuestions = (isSolved) => {
    let filteredData;
    if (!isMyQuestions) {
      filteredData = props.allQuestions.filter((question) => {
        if (isSolved) return question.answers[15].answer === "1";
        else
          return (
            question.answers[15].answer === undefined ||
            question.answers[15].answer === "0"
          );
      });
      if (filteredData.length > 0) {
        props.fetchQuestionsSuccess(filteredData.sort(sortHelper));
        props.fetchTotalQuestionCountSuccess(filteredData.length);
      } else {
        alert(
          "There is no question for " +
            (isSolved ? "SOLVED" : "UNSOLVED ") +
            "questions"
        );
      }
    } else {
      filteredData = getMyQuestions(true).filter((question) => {
        if (isSolved) return question.answers[15].answer === "1";
        else return question.answers[15].answer !== "1";
      });
      if (filteredData.length > 0) {
        props.fetchTotalQuestionCountSuccess(filteredData.length);
        props.fetchQuestionsSuccess(filteredData.sort(sortHelper));
      } else {
        alert(
          "There is no question for " +
            (isSolved ? "SOLVED" : "UNSOLVED ") +
            "questions"
        );
      }
    }
  };

  const sortHelper = (item, otherItem) => {
    if (
      item.answers[18].answer !== undefined &&
      otherItem.answers[18].answer !== undefined
    ) {
      const itemTime =
        new Date().getTime() - new Date(item.answers[18].answer).getTime();
      const otherItemTime =
        new Date().getTime() - new Date(otherItem.answers[18].answer).getTime();
      return itemTime - otherItemTime;
    } else if (
      item.answers[18].answer !== undefined &&
      otherItem.answers[18].answer === undefined
    ) {
      return -1;
    } else if (
      item.answers[18].answer !== undefined &&
      otherItem.answers[18].answer === undefined
    ) {
      return 1;
    }
    return 1;
  };

  const handleSelect = (key) => {
    if (key === "Unsolved") {
      isSolvedQuestions(false);
    } else if (key === "Solved") {
      isSolvedQuestions(true);
    } else {
      if (isMyQuestions) getMyQuestions(true);
      else {
        props.fetchQuestions(0, props.questionPerPage);
      }
    }
    setPageOffset(0);
  };

  const login = () => {
    props.auth();
    handleClose();
  };

  let pages = [];
  const pageCount = Math.ceil(props.totalQuestionCount / props.questionPerPage);
  for (let i = 0; i < pageCount; i++) {
    pages.push(i);
  }
  const dynamicGetQuestionsContainer = pages.map((page) => {
    let offset = page * props.questionPerPage;
    return (
      <button
        key={offset}
        onClick={() => props.fetchQuestions(offset, props.questionPerPage)}
      >
        {page + 1}
      </button>
    );
  });

  const staticGetQuestionsContainer = pages.map((page) => {
    let offset = page * props.questionPerPage;
    return (
      <button key={offset} onClick={() => setPageOffset(offset)}>
        {page + 1}
      </button>
    );
  });

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
          <button
            className="MyQuestion"
            onClick={() => getMyQuestions(true & !isMyQuestions, true)}
          >
            {!isMyQuestions ? "My Questions" : "All Questions"}
          </button>
        </div>
      </div>
      <div className="Parts">
        <div className="Part-one">
          <JFSupport />
          <JFArticles />
        </div>
        <div className="Part-two">
          <div className="QuestionsDiv">
            <span>Recent Questions</span>
            <Tabs
              defaultActiveKey="All"
              id="uncontrolled-tab-example"
              onSelect={handleSelect}
            >
              <Tab eventKey="All" title="All">
                <Questions questions={props.questions} />
                <div className="Pages">{dynamicGetQuestionsContainer}</div>
              </Tab>
              <Tab eventKey="Unsolved" title="Unsolved">
                <Questions
                  questions={props.questions.slice(
                    pageOffset,
                    pageOffset + props.questionPerPage
                  )}
                />
                <div className="Pages">{staticGetQuestionsContainer}</div>
              </Tab>
              <Tab eventKey="Solved" title="Solved">
                <Questions
                  questions={props.questions.slice(
                    pageOffset,
                    pageOffset + props.questionPerPage
                  )}
                />
                <div className="Pages">{staticGetQuestionsContainer}</div>
              </Tab>
            </Tabs>
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
    totalQuestionCount: state.questions.totalQuestionCount,
    questions: state.questions.questions,
    allQuestions: state.questions.all_questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestionsSuccess: (newQuestions) =>
      dispatch(actions.fetchQuestionsSuccess(newQuestions)),
    fetchTotalQuestionCountSuccess: (newQuestionCount) =>
      dispatch(actions.fetchTotalQuestionCountSuccess(newQuestionCount)),
    fetchQuestions: (pageNumber, questionPerPage) =>
      dispatch(actions.fetchQuestions(pageNumber, questionPerPage)),
    fetchAllQuestions: () => dispatch(actions.fetchAllQuestions()),
    auth: () => dispatch(actions.auth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
