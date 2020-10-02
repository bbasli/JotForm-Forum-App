import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Toolbar from "../../components/Header/Toolbar/Toolbar";
import Logo from "../../components/Header/Logo/Logo";
import "./Answer.css";
import JFSupport from "../JFSupport/JFSupport";
import NewAnswer from "./NewAnswer/NewAnswer";
import UserCard from "../UserCard/UserCard";

class Answer extends Component {
  state = {
    question: {
      id: "",
      title: "",
      username: "",
      content: "",
      created_at: "",
      helperUrl: "",
      ssUrl: "",
      replyCount: 0,
    },
    answers: [],
    questionFormID: "",
    answerFormID: process.env.REACT_APP_ANSWER_FORM_ID,
    apiKey: process.env.REACT_APP_APP_KEY,
    user: {},
    answer: "",
  };

  componentDidMount() {
    console.log("[Answers.js] componentDidMount");
    const apiKey = this.props.location.state.apiKey;
    axios
      .get(
        "https://api.jotform.com/submission/" +
          this.props.match.params.id +
          "?apiKey=" +
          apiKey
      )
      .then((response) => {
        const answer = response.data.content.answers;
        let name = answer[3].answer.first;
        //debugger;
        if (answer[3].answer.last !== "" && answer[3].answer.last !== undefined)
          name += " " + answer[3].answer.last;
        this.setState({
          question: {
            id: response.data.content.id,
            title: answer[5].answer,
            username: name,
            content: answer[6].answer,
            created_at: response.data.content.created_at,
            helperUrl: answer[7].answer,
            ssUrl: answer[8].answer,
            replyCount: answer[9].answer !== undefined ? answer[9].answer : 0,
          },
          apiKey: apiKey,
          user: this.props.location.state.user,
          questionFormID: this.props.match.params.id,
        });
      });
    axios
      .get(
        "https://api.jotform.com/form/" +
          this.state.answerFormID +
          "/submissions?apiKey=" +
          apiKey
      )
      .then((response) => {
        this.setState({
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
    const submisson = [
      {
        3: this.state.answer,
        4: { first: this.state.user.username, last: "" },
        6: this.state.user.avatarUrl,
        7: this.state.questionFormID,
      },
    ];
    const putRequestUrl =
      "https://api.jotform.com/form/" +
      this.state.answerFormID +
      "/submissions?apiKey=" +
      this.state.apiKey;

    axios.put(putRequestUrl, submisson).then(
      (response) => {
        if (response.status === 200) {
          const postRequestUrl =
            "https://api.jotform.com/submission/" +
            this.state.questionFormID +
            "?apiKey=" +
            this.state.apiKey;
          const replyCount = parseInt(this.state.question.replyCount) + 1;
          axios
            .post(postRequestUrl, "submission[9]=" + replyCount)
            .then((rsp) => {
              const question = this.state.question;
              if (rsp.status === 200) {
                this.setState({
                  question: {
                    ...question,
                    replyCount: replyCount,
                  },
                });
                window.location.href="/";
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
    //console.log(this.state);
    const userAvatar = (
      <Logo
        src={this.state.user.avatarUrl}
        alt="User-avatar"
        //eslint-disable-next-line
        style="Avatar"
      />
    );
    let answers = null;
    if (this.state.answers.length > 0) {
      const temp = this.state.answers;
      answers = temp
        .filter((answer) => {
          return (
            answer.answers[7].answer === this.state.questionFormID &&
            answer.status === "ACTIVE"
          );
        })
        .map((answer) => {
          return (
            <UserCard
              key={answer.id}
              username={answer.answers[4].answer.first}
              created_at={answer.created_at}
              content={answer.answers[3].answer}
              isAsked={false}
            />
          );
        }).reverse();
    }
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="Head">
          <div style={{ width: "20%" }}></div>
          <div style={{ width: "60%" }}>
            <Toolbar avatar={userAvatar} />
          </div>
          <div style={{ width: "20%" }}></div>
        </div>
        <div className="Container">
          <div style={{ width: "20%" }}></div>
          <div className="Mid">
            <div className="Left">
              <div className="GoBack">
                <NavLink to="/">
                  <i className="fas fa-chevron-left"></i>
                  <span>&nbsp;&nbsp;Form Support</span>
                </NavLink>
              </div>
              <JFSupport />
            </div>
            {/* MAIN PART OF PAGE */}
            <div className="Main">
              <div>
                <span>{this.state.question.title}</span>
                <UserCard
                  username={this.state.user.username}
                  created_at={this.state.question.created_at}
                  content={this.state.question.content}
                  helperUrl={this.state.question.helperUrl}
                  ssUrl={this.state.question.ssUrl}
                  isAsked={true}
                />
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

export default Answer;
