import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";

export class Checkout extends Component {
  state = {
    ingridients: { salad: 1, meat: 1, cheese: 1, bacon: 1 }
  };
  checkoutCancelledHandler = () => {
    this.props.history.push("/burger-builder");
  };
  checkoutContinuedHandler = () => {
    this.props.history.push("/checkout/contact-details");
  };
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingridients={this.state.ingridients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;
