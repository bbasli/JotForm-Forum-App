import React, { Component } from "react";

import Forum from "./containers/Forum/Forum";
import Login from './containers/Login/Login';
import NewQuestion from './containers/NewQuestion/NewQuestion';
import Answer from "./containers/Answer/Answer";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/questions" component={Forum} />
          <Route path="/questions/from=:offset" component={Forum} />
          <Route path="/new-question" component={NewQuestion} />
          <Route path="/answers/:id" component={Answer}/>
      </Switch>
    );
  }
}

export default App;
