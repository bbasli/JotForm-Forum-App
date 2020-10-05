import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import "./NewQuestion.css";

class NewQuestion extends Component {
  state = {
    question: {
      title: "",
      content: "",
      helperUrl: "",
      ssUrl: "",
    }
  };

  updateTitleHandler = (event) => {
    this.setState({
      question: {
        ...this.state.question,
        title: event.target.value,
      },
    });
  };

  updateContentHandler = (event) => {
    this.setState({
      question: {
        ...this.state.question,
        content: event.target.value,
      },
    });
  };

  updateHelperUrlHandler = (event) => {
    this.setState({
      question: {
        ...this.state.question,
        helperUrl: event.target.value,
      },
    });
  };

  updateSsUrlHandler = (event) => {};

  postDataHandler = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const submisson = [
      {
        3: { first: user.username, last: "" },
        5: this.state.question.title,
        6: this.state.question.content,
        7: this.state.question.helperUrl,
        8: this.state.question.ssUrl,
        9: 0,
        10: user.avatarUrl
      },
    ];
    const requestUrl =
      "https://api.jotform.com/form/" +
      process.env.REACT_APP_QUESTION_FORM_ID +
      "/submissions?apiKey=" +
      process.env.REACT_APP_APP_KEY;

    axios.put(requestUrl, submisson).then(
      (response) => {
        console.log(response);
        this.props.history.push("/questions");
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
          <Header showSearchBar={false} />
          <div
            style={{
              padding: "20px 0",
              borderBottom: "1px solid #eaeaea",
            }}
          >
            <div className="Question-Content-Container">
              <div style={{ width: "30%" }}></div>
              <div className="Fields">
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
          <div className="Helper-Fields">
            <div className="Split Answer-field">
              <span style={{ width: "30%" }} className="Left-heading">
                Let Us Help You Better
              </span>
              <div className="HelperUrl-Field">
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
                style={{ maxWidth: "769px", width: "70%" }}
                className="Title Split Border"
                type="file"
                value={this.state.question.ssUrl}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(NewQuestion);
