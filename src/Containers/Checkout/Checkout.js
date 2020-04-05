import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

export class Checkout extends Component {
  state = {
    ingridients: {},
    totalPrice: null,
  };
  checkoutCancelledHandler = () => {
    this.props.history.push("/burger-builder");
  };

  checkoutContinuedHandler = () => {
    this.props.history.push({
      pathname: this.props.match.url + "/contact-data",
    });
  };

  componentDidMount() {
    const ingridients = {};
    const query = new URLSearchParams(this.props.location.search);
    for (const q of query.entries()) {
      //[salad,1]
      if (q[0] != "totalPrice") {
        ingridients[q[0]] = +[q[1]];
      } else {
        this.setState({ totalPrice: q[1] });
      }
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
        <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => (
            <ContactData
              {...props}
              totalPrice={this.state.totalPrice}
              ingridients={this.state.ingridients}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
