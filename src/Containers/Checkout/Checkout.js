import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";

export class Checkout extends Component {
  state = {
    ingridients: { salad: 1, meat: 1, cheese: 1, bacon: 1 },
  };
  checkoutCancelledHandler = () => {
    this.props.history.push("/burger-builder");
  };

  checkoutContinuedHandler = () => {
    this.props.history.push("/checkout/contact-details");
  };

  componentDidMount() {
    const ingridients = [];
    const query = new URLSearchParams(this.props.location.search);
    for (const q of query.entries()) {
      //[salad,1]
      ingridients[q[0]] = +[q[1]];
    }
    this.setState({ ingridients: ingridients });
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
