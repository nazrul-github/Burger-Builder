import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./HOC/Home";

export class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
