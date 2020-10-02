import React, { Component } from "react";
import axios from "axios";

import "./Forum.css";
import Header from "../../components/Header/Header";
import Body from "../../components/Body/Body";
import Questions from "../Questions/Questions";
import SubHeader from "../../components/Header/SubHeader/SubHeader";
import SearchBar from "../../components/Header/SearchBar/SearchBar";

class Forum extends Component {
  state = {
    user: {
      username: "",
      // obtain apiKey from login page
      apiKey: "",
      avatarUrl: "",
    },
    formID: process.env.REACT_APP_QUESTION_FORM_ID,
    questions: [],
    showMyQuestions: false,
    searchInput: "",
    search: false,
    apiKey: process.env.REACT_APP_APP_KEY,
  };

  componentDidMount() {
    console.log("[Forum.js] componentDidMount");
    axios
      .get("https://api.jotform.com/user?apiKey=" + this.state.apiKey)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.content;
          const requestUrl =
            "https://api.jotform.com/form/" +
            this.state.formID +
            "/submissions?apiKey=" +
            this.state.apiKey;
          axios.get(requestUrl).then((rsp) => {
            this.setState({
              user: {
                username: data.username,
                apiKey: process.env.REACT_APP_USER_API_KEY,
                avatarUrl: data.avatarUrl,
              },
              questions: rsp.data.content,
            });
          }, (error) => {
            console.log("error ", error);
          });
        }
      });
  }

  getMyQuestions = () => {
    this.setState({ showMyQuestions: true });
  };

  searchInputHandler = (evt) => {
    this.setState({ searchInput: evt.target.value });
  };

  searchButtonHandler = () => {
    this.setState({ search: true });
  };

  clearSearchInput = () => {
    this.setState({ searchInput: "" });
  };

  loginFunction = () => {
    window.JF.login(
      (response) => {
        console.log("Logged in successfully");
        this.setState({ apiKey: window.JF.getAPIKey() });
      },
      (error) => {
        window.alert("Could not authorize user ");
      }
    );
  };

  login = () => {
    /* let formData = new FormData();
    formData.append("username", "username");
    formData.append("password", "password");
    formData.append("appName", "appName");
    formData.append("access", "access");


    const url = "https://api.jotform.com/user/login";
    const config = {
        headers: {
            "content-type": "multipart/form-data"
        }
    }
    axios.post(url, formData, config)
    .then(response => {
        console.log(response);
        console.log(response.data.content.appKey);
        if(response.data.content.appKey !== undefined)
            this.setState({apiKey: response.data.content.appKey});
    }); */
  };

  render() {
    console.log("[Forum.js] rendering...");
    let questions = null;
    //console.log(this.state.questions.length);
    if (this.state.questions.length > 0)
      questions = (
        <Questions
          questions={this.state.questions}
          showMyQuestions={this.state.showMyQuestions}
          user={this.state.user}
          search={this.state.search}
          target={this.state.searchInput}
          apiKey={this.state.apiKey}
        />
      );

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="Edge"></div>
        <div style={{ width: "63%" }}>
          <Header avatar={this.state.user.avatarUrl}>
            <SubHeader>
              <SearchBar
                searchInputHandler={this.searchInputHandler}
                search={this.searchButtonHandler}
                searchInput={this.state.searchInput}
              />
            </SubHeader>
          </Header>
          <Body
            showMyQuestions={this.getMyQuestions}
            username={this.state.user.username}
            avatarUrl={this.state.user.avatarUrl}
            apiKey={this.state.apiKey}
          >
            {questions}
          </Body>
        </div>
        <div className="Edge"></div>
      </div>
    );
  }
}

export default Forum;
