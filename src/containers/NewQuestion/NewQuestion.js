import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Header from "../../components/Header/Header";
import "./NewQuestion.css";
import * as actions from "../../store/actions/index";

class NewQuestion extends Component {
  state = {
    question: {
      title: "",
      content: "",
      helperUrl: "",
      ssUrl: "",
    },
    username: "",
    email: "",
  };

  componentDidMount() {
    this.props.authCheckState();

    if (this.props.location.aboutProps !== undefined) {
      this.props.fetchQuestion(this.props.location.aboutProps.questionID);
      if (
        this.props.question !== null &&
        this.props.location.aboutProps.type === "Question"
      ) {
        this.setState({
          question: {
            title: this.props.question.answers[5].answer,
            content: this.props.question.answers[6].answer,
            helperUrl: this.props.question.answers[7].answer,
            ssUrl: "",
          },
        });
      }
    }
  }

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
        content: event,
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

  updateSsUrlHandler = (event) => {
    console.log(event.target.files[0]);
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        question: {
          ...this.state.question,
          ssUrl: reader.result,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  updateUsernameHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  updateEmailHandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  postDataHandler = (event) => {
    event.preventDefault();

    let formData = new FormData();
    let requestUrl =
      "https://api.jotform.com/form/" +
      process.env.REACT_APP_QUESTION_FORM_ID +
      "/submissions?apiKey=" +
      process.env.REACT_APP_APP_KEY;

    if (this.props.location.aboutProps !== undefined) {
      requestUrl =
        "https://api.jotform.com/submission/" +
        this.props.location.aboutProps.questionID +
        "?apiKey=" +
        process.env.REACT_APP_APP_KEY;
      if (this.props.location.aboutProps.type === "Answer")
        formData.append("submission[3]", this.state.question.content);
      else {
        formData.append("submission[3_first]", this.props.user.username);
        formData.append("submission[5]", this.state.question.title);
        formData.append("submission[6]", this.state.question.content);
        formData.append("submission[7]", this.state.question.helperUrl);
        formData.append("submission[9]", 0);
        formData.append("submission[10]", this.props.user.avatarUrl);
        formData.append("submission[11]", this.state.question.ssUrl);
      }
    } else {
      if (this.props.user !== null) {
        formData.append("submission[3_first]", this.props.user.username);
        formData.append("submission[10]", this.props.user.avatarUrl);
      } else {
        formData.append("submission[3_first]", this.state.username);
        formData.append("submission[13]", this.state.email);
        formData.append("submission[10]", process.env.REACT_APP_AVATAR_URL);
      }
      formData.append("submission[5]", this.state.question.title);
      formData.append("submission[6]", this.state.question.content);
      formData.append("submission[7]", this.state.question.helperUrl);
      formData.append("submission[9]", 0);
      formData.append("submission[11]", this.state.question.ssUrl);
    }

    axios({
      method: "post",
      url: requestUrl,
      data: formData,
      headers: { "Content-type": "multipart/form-data" },
    }).then((response) => {
      this.props.history.push("/questions");
    });
  };

  render() {
    let modal = null;
    if (this.props.user === null) {
      modal = (
        <div className="UserInput">
          <input
            className="Title Split Border"
            type="text"
            placeholder="Your name"
            onChange={this.updateUsernameHandler}
            required
          />
          <input
            className="Title Split Border"
            type="email"
            placeholder="Your email address"
            style={{ marginLeft: "5px" }}
            onChange={this.updateEmailHandler}
            required
          />
        </div>
      );
    }
    let helperContainer = (
      <div className="Helper-Fields">
        <div className="Split Answer-field">
          <span style={{ width: "30%" }} className="Left-heading">
            Let Us Help You Better
          </span>
          <div className="HelperUrl-Field">
            <span>
              Please provide more details about your problem by including URL of
              the page or a screenshot.
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
        <input
          className="Ask"
          style={{ width: "200px" }}
          type="submit"
          value="Post Question"
        />
      </div>
    );
    let titleContainer = (
      <div className="Fields">
        <span className="Split Heading">
          <strong>How can we help?</strong>
        </span>
        {modal}
        <input
          className="Title Split Border"
          placeholder="e.g., How can I create a successful survey form?"
          value={this.state.question.title}
          onChange={this.updateTitleHandler}
          required
        />
        <div className="Split Border Area">
          <ReactQuill
            value={this.state.question.content}
            onChange={this.updateContentHandler}
            style={{ height: "91%" }}
          />
        </div>
      </div>
    );
    if (this.props.location.aboutProps !== undefined)
      if (this.props.location.aboutProps.type === "Answer") {
        helperContainer = null;
        titleContainer = (
          <div className="Fields">
            <span className="Split Heading">
              <strong>Your Answer</strong>
            </span>
            <div className="Split Border Area">
              <ReactQuill
                value={this.state.question.content}
                onChange={this.updateContentHandler}
                style={{ height: "91%" }}
              />
            </div>
            <button
              className="Ask"
              style={{ width: "200px" }}
              onClick={this.postDataHandler}
            >
              Save
            </button>
          </div>
        );
      }
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="Edge"></div>
        <div style={{ width: "63%" }}>
          <Header
            showSearchBar={false}
            type={
              this.props.location.aboutProps === undefined
                ? null
                : this.props.location.aboutProps.type
            }
          />
          <form onSubmit={this.postDataHandler}>
            <div className="QuestionContainer">
              <div className="Question-Content-Container">
                <div style={{ width: "30%" }}></div>
                {titleContainer}
              </div>
            </div>
            {helperContainer}
          </form>
        </div>
        <div className="Edge"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    question: state.answers.question,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: () => dispatch(actions.auth()),
    fetchQuestion: (id) => dispatch(actions.fetchQuestion(id)),
    authCheckState: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
