import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "./main.scss";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";
import Answers from "./Answers/Answers";
import NewQuestion from "./NewQuestion/NewQuestion";

class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect from="/questions" to="/" />
        <Route path="/" exact component={Home} />
        <Route path="/answers/:id" component={Answers} />
        <Route path="/new-question" component={NewQuestion} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
export default App;
