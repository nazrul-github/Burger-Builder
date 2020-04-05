import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./HOC/Home";

export class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
