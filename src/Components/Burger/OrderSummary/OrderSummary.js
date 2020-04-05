import React, { Component } from "react";
import Wrapper from "../../../HOC/Wrapper";
import Button from "../../UI/Button/Button";
import { Route } from "react-router-dom";
import Checkout from "../../../Containers/Checkout/Checkout";

export class OrderSummary extends Component {
  //this could be a functional component

  render() {
    const ingridientsSummary = Object.keys(this.props.ingridients).map(
      (igKey, i) => {
        return (
          <li key={i}>
            <span style={{ textTransform: "capitalize" }}>{igKey}: </span>
            {this.props.ingridients[igKey]}
          </li>
        );
      }
    );

    return (
      <Wrapper>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingridients</p>
        <ul>{ingridientsSummary}</ul>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          CONTINUE
        </Button>
      </Wrapper>
    );
  }
}

export default OrderSummary;
