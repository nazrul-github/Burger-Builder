import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./HOC/Home";
import { connect } from "react-redux";

export class App extends Component {
  componentDidMount() {
    // console.log(this.props.ing);
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.ingridients,
  };
};

export default connect(mapStateToProps)(App);
