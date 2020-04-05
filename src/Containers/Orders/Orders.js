import React, { Component } from "react";
import PropTypes from "prop-types";
import Order from "../../Components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/WithErrorHandler";

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((resp) => {
        const fetechedData = [];
        for (const key in resp.data) {
          fetechedData.push({ ...resp.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetechedData });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let loading = <Spinner />;

    return this.state.loading
      ? loading
      : this.state.orders.map((val) => {
          return (
            <Order
              key={val.id}
              address={val.address}
              email={val.email}
              ingridients={val.ingridients}
              name={val.name}
              totalPrice={Number.parseFloat(val.totalPrice)}
            />
          );
        });
  }
}
Orders.propType = {};

export default withErrorHandler(Orders, axios);
