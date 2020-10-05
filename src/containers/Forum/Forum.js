import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./Forum.css";
import Header from "../../components/Header/Header";
import Body from "../../components/Body/Body";
import Questions from "../Questions/Questions";

class Forum extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    console.log("[Forum.js] componentDidMount");
    const requestUrl =
      "https://api.jotform.com/form/" +
      process.env.REACT_APP_QUESTION_FORM_ID +
      "/submissions?apiKey=" +
      process.env.REACT_APP_APP_KEY +
      "&limit=6";
    axios.get(requestUrl).then(
      (rsp) => {
        this.setState({
          questions: rsp.data.content,
        });
      },
      (error) => {
        console.log("error ", error);
      }
    );
  }

  questionsHandler = (newQuestions) => {
    this.setState({
      questions: newQuestions,
    });
  };

  render() {
    console.log("[Forum.js] rendering...");
    let questions = null;
    if (this.state.questions.length > 0)
      questions = <Questions questions={this.state.questions} />;

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="Edge"></div>
        <div style={{ width: "63%" }}>
          <Header showSearchBar={true} setQuestions={this.questionsHandler} />
          <Body setQuestions={this.questionsHandler} user={this.props.user}>
            {questions}
          </Body>
        </div>
        <div className="Edge"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Forum);
