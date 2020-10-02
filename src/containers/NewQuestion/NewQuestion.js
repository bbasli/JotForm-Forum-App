import React, { Component } from "react";
import axios from "axios";

import Header from "../../components/Header/Header";
import Logo from "../../components/Header/Logo/Logo";
import "./NewQuestion.css";

class NewQuestion extends Component {
  state = {
    username: "",
    userAvatar: null,
    formID: process.env.REACT_APP_QUESTION_FORM_ID,
    apiKey: process.env.REACT_APP_APP_KEY,
    question: {
      title: "",
      content: "",
      helperUrl: "",
      ssUrl: "",
    },
  };

  componentDidMount() {
    console.log("[NewQuestion.js] componentDidMount");
    this.setState({
      username: this.props.location.state.username,
      avatarUrl: this.props.location.state.avatarUrl,
    });
  }

  updateTitleHandler = (event) => {
    const question = this.state.question;
    this.setState({
      question: {
        ...question,
        title: event.target.value,
      },
    });
  };

  updateContentHandler = (event) => {
    const question = this.state.question;
    this.setState({
      question: {
        ...question,
        content: event.target.value,
      },
    });
  };

  updateHelperUrlHandler = (event) => {
    const question = this.state.question;
    this.setState({
      question: {
        ...question,
        helperUrl: event.target.value,
      },
    });
  };

  updateSsUrlHandler = (event) => {
    const question = this.state.question;
    var file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        question: {
          ...question,
          ssUrl: reader.result,
        },
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  postDataHandler = (event) => {
    event.preventDefault();
    const submisson = [
      {
        3: { first: this.state.username, last: "" },
        5: this.state.question.title,
        6: this.state.question.content,
        7: this.state.question.helperUrl,
        8: this.state.question.ssUrl,
      },
    ];
    const requestUrl =
      "https://api.jotform.com/form/" +
      this.state.formID +
      "/submissions?apiKey=" +
      this.state.apiKey;

    axios.put(requestUrl, submisson).then(
      (response) => {
        console.log(response);
        window.location.href = "/";
      },
      (error) => {
        console.log("Error ", error);
      }
    );
  };

  render() {
    console.log("[NewQuestion.js] rendering...");
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="Edge"></div>
        <div style={{ width: "63%" }}>
          <Header avatar={this.state.avatarUrl}>
            <div className="NewQuestion-SubHeader">
              <div style={{ marginTop: "129px", width: "30%" }}>
                <Logo
                  src="//cdn.jotfor.ms/assets/img/memberkit/answers-create-podo.svg?v=1"
                  alt="Answer-podo"
                  // eslint-disable-next-line
                  style="Answer-podo"
                />
                <span
                  style={{
                    color: "#0773EE",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                  }}
                >
                  Ask Your Question
                </span>
              </div>

              <div className="SubHeader-Text">
                <strong>
                  <p>Contact JotForm Support</p>
                </strong>
                <span>Our customer support team is available 24/7</span>
              </div>
            </div>
          </Header>
          <div
            style={{
              padding: "20px 0",
              borderBottom: "1px solid #eaeaea",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div style={{ width: "30%" }}></div>
              <div
                style={{
                  width: "70%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span className="Split Heading">
                  <strong>How can we help?</strong>
                </span>
                <input
                  className="Title Split Border"
                  placeholder="e.g., How can I create a successful survey form?"
                  value={this.state.question.title}
                  onChange={this.updateTitleHandler}
                />
                <textarea
                  className="Split Border Area"
                  value={this.state.question.content}
                  onChange={this.updateContentHandler}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="Fields">
            <div className="Split Answer-field">
              <span style={{ width: "30%" }} className="Left-heading">
                Let Us Help You Better
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                }}
              >
                <span>
                  Please provide more details about your problem by including
                  URL of the page or a screenshot.
                </span>
                <input
                  className="Title Split Border"
                  placeholder="e.g., http://www.domain.com/contact.html"
                  value={this.state.question.helperUrl}
                  onChange={this.updateHelperUrlHandler}
                />
              </div>
            </div>
            <div className="Split Answer-field Upload-field">
              <span style={{ width: "30%" }} className="Left-heading">
                Upload a Screenshot
              </span>
              <input
                style={{ width: "769px" }}
                className="Title Split Border"
                type="file"
                //value={this.state.question.ssUrl}
                onChange={this.updateSsUrlHandler}
              />
            </div>
            <button
              className="Ask"
              style={{ width: "200px" }}
              onClick={this.postDataHandler}
            >
              Post Question
            </button>
          </div>
        </div>
        <div className="Edge"></div>
      </div>
    );
  }
}

export default NewQuestion;
