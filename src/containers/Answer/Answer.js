import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Toolbar from "../../components/Header/Toolbar/Toolbar";
import "./Answer.css";
import JFSupport from "../JFSupport/JFSupport";
import NewAnswer from "./NewAnswer/NewAnswer";
import UserCard from "../UserCard/UserCard";

class Answer extends Component {
  state = {
    replyCount: 0,
    title: "",
    questionCard: null,
    answers: [],
    answer: "",
  };

  componentDidMount() {
    console.log("[Answers.js] componentDidMount");
    let data = null;
    let name = "";
    axios
      .get(
        "https://api.jotform.com/submission/" +
          this.props.match.params.id +
          "?apiKey=" +
          process.env.REACT_APP_APP_KEY
      )
      .then((response) => {
        data = response.data.content;
        name = data.answers[3].answer.first;
        if (
          data.answers[3].answer.last !== "" &&
          data.answers[3].answer.last !== undefined
        )
          name += " " + data.answers[3].answer.last;
      });
    axios
      .get(
        "https://api.jotform.com/form/" +
          process.env.REACT_APP_ANSWER_FORM_ID +
          "/submissions?apiKey=" +
          process.env.REACT_APP_APP_KEY
      )
      .then((response) => {
        //console.log(data)
        //console.log(data.answers[10].answer)
        this.setState({
          questionCard: (
            <UserCard
              user={{ username: name, avatarUrl: data.answers[10].answer }}
              created_at={data.created_at}
              content={data.answers[6].answer}
              helperUrl={data.answers[7].answer}
              ssUrl={data.answers[8].answer}
              isAsked={true}
            />
          ),
          replyCount:
            data.answers[9].answer === undefined ? 0 : data.answers[9].answer,
          title: data.answers[5].answer,
          answers: response.data.content,
        });
      });
  }

  answerHandler = (event) => {
    event.preventDefault();
    this.setState({
      answer: event.target.value,
    });
  };

  postDataHandler = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const submisson = [
      {
        3: this.state.answer,
        4: { first: user.username, last: "" },
        6: user.avatarUrl,
        7: this.props.match.params.id,
      },
    ];
    const putRequestUrl =
      "https://api.jotform.com/form/" +
      process.env.REACT_APP_ANSWER_FORM_ID +
      "/submissions?apiKey=" +
      process.env.REACT_APP_APP_KEY;

    axios.put(putRequestUrl, submisson).then(
      (response) => {
        if (response.status === 200) {
          const postRequestUrl =
            "https://api.jotform.com/submission/" +
            this.props.match.params.id +
            "?apiKey=" +
            process.env.REACT_APP_APP_KEY;
          const replyCount = parseInt(this.state.replyCount) + 1;
          axios
            .post(postRequestUrl, "submission[9]=" + replyCount)
            .then((rsp) => {
              if (rsp.status === 200) {
                this.setState({
                  replyCount: replyCount,
                });
                this.props.history.push("/questions");
              }
            });
        }
      },
      (error) => {
        console.log("Error ", error);
      }
    );
  };

  render() {
    console.log("[Answers.js] rendering...");
    let answers = null;
    if (this.state.answers.length > 0) {
      const temp = this.state.answers;
      answers = temp
        .filter((answer) => {
          return (
            answer.answers[7].answer === this.props.match.params.id &&
            answer.status === "ACTIVE"
          );
        })
        .map((answer) => {
          return (
            <UserCard
              key={answer.id}
              user={{
                username: answer.answers[4].answer.first,
                avatarUrl: answer.answers[6].answer,
              }}
              created_at={answer.created_at}
              content={answer.answers[3].answer}
              isAsked={false}
            />
          );
        })
        .reverse();
    }
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="Head">
          <div style={{ width: "20%" }}></div>
          <div style={{ width: "60%" }}>
            <Toolbar />
          </div>
          <div style={{ width: "20%" }}></div>
        </div>
        <div className="Container">
          <div style={{ width: "20%" }}></div>
          <div className="Mid">
            <div className="Left">
              <div className="GoBack">
                <NavLink to="/questions">
                  <i className="fas fa-chevron-left"></i>
                  <span>&nbsp;&nbsp;Form Support</span>
                </NavLink>
              </div>
              <JFSupport />
            </div>
            {/* MAIN PART OF PAGE */}
            <div className="Main">
              <div>
                <span>{this.state.title}</span>
                {this.state.questionCard}
              </div>
              {answers}
              <NewAnswer
                content={this.state.answer}
                answerHandler={this.answerHandler}
                post={this.postDataHandler}
              />
            </div>
          </div>
          <div style={{ width: "20%" }}></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

Answer.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(Answer);
