import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const post = {
      name: this.state.name,
      email: this.state.email,
      address: {
        street: this.state.address.street,
        postalCode: this.state.address.postalCode,
      },
      totalPrice: this.props.totalPrice,
      ingridients: this.props.ingridients,
    };
    console.log(post);
    axios
      .post("/orders.json", post)
      .then((resp) => {
        alert("order created successfully");
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  handleObjectChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState((state, props) => {
      const address = { ...state.address };
      address[name] = value;
      return {
        address,
      };
    });
  };

  render() {
    let loading = <Spinner />;
    return this.state.loading ? (
      loading
    ) : (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form action="">
          <input
            type="text"
            name="name"
            id=""
            onChange={this.handleChange}
            placeholder="yourName"
          />
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Your email"
            id=""
          />
          <input
            type="text"
            name="street"
            onChange={this.handleObjectChange}
            placeholder="Street"
            id=""
          />
          <input
            type="text"
            name="postalCode"
            onChange={this.handleObjectChange}
            placeholder="Postal Code"
            id=""
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            Order Now
          </Button>
        </form>
      </div>
    );
  }
}
ContactData.propType = {
  ingridients: PropTypes.object,
  totalPrice: PropTypes.number,
};

export default ContactData;
