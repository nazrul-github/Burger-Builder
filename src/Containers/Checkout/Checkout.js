import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

export class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.push("/");
  };

  checkoutContinuedHandler = () => {
    this.props.history.push({
      pathname: this.props.match.url + "/contact-data",
    });
  };

  componentDidMount() {
    // const ingridients = {};
    // const query = new URLSearchParams(this.props.location.search);
    // for (const q of query.entries()) {
    //   //[salad,1]
    //   if (q[0] != "totalPrice") {
    //     ingridients[q[0]] = +[q[1]];
    //   } else {
    //     this.setState({ totalPrice: q[1] });
    //   }
    // }
    // this.setState({ ingridients: ingridients });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingridients={this.props.ing}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
        )} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.ing.ingridients,
    totalPrice: state.ing.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
