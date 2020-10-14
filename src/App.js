import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Forum from "./containers/Forum/Forum";
import Login from "./containers/Login/Login";
import NewQuestion from "./containers/NewQuestion/NewQuestion";
import Answer from "./containers/Answer/Answer";
import NotFound from "./containers/NotFound/NotFound";

class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect from="/questions" to="/" />
        <Route path="/" exact component={Forum} />
        <Route path="/login" component={Login} />
        <Route path="/questions/from=:offset" component={Forum} />
        <Route path="/new-question" component={NewQuestion} />
        <Route path="/answers/:id" component={Answer} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;
