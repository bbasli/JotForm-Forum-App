import React, { Component } from "react";

import Forum from "./containers/Forum/Forum";
import NewQuestion from './containers/NewQuestion/NewQuestion';
import Answer from "./containers/Answer/Answer";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Forum} />
          <Route path="/new-question" component={NewQuestion} />
          <Route path="/answers/:id" component={Answer}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
