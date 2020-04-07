import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../Components/UI/Input/Input";

export class ContactData extends Component {
  state = {
    value: "Hi",
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      loading: false,
    },
  };

  formObjectType = function ({ elementType, type, placeholder, value }) {
    let formObjectTypo = {
      elementType: elementType,
      elementConfig: {
        type: type,
        placeholder: placeholder,
      },
      value: value,
    };

    return formObjectTypo;
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
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let loading = <Spinner />;

    return this.state.loading ? (
      loading
    ) : (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form action="">
          {formElementsArray.map((vl, ind) => {
            return (
              <Input
                key={vl.id}
                elementType={vl.config.elementType}
                elementConfig={vl.config.elementConfig}
                value={vl.config.value}
              />
            );
          })}
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
