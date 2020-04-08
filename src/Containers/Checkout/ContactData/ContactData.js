import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../Components/UI/Input/Input";

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation:{},
        value: "fastest",
        valid: true,
      },
    },
    loading: false,
    isFormValid: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  orderHandler = (event) => {
    if (this.state.isFormValid) {
      event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      totalPrice: this.props.totalPrice,
      ingridients: this.props.ingridients,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((resp) => {
        alert("order created successfully");
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
    }
    else {
      alert("Form is not valid"); 
    }
  };

  handleChange = (event, inputIdentifier) => {
    const value = event.target.value;

    //First we copied the main object
    const updatedOrderForm = { ...this.state.orderForm };

    //than we copied the main objects nested object(if we don't do it like this then our nested objects won't get copied && if we have any other nested object we will have to copy them too via this.)
    const identityFormItems = { ...updatedOrderForm[inputIdentifier] };
    identityFormItems.value = value;
    identityFormItems.touched = true;
    identityFormItems.valid = this.checkValidity(
      identityFormItems.value,
      identityFormItems.validation
    );
    updatedOrderForm[inputIdentifier] = identityFormItems;

    let formIsValid = true;
    for (const key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }
    console.log(updatedOrderForm);

    this.setState({ orderForm: updatedOrderForm, isFormValid: formIsValid });
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
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map((vl, ind) => {
            return (
              <Input
                key={vl.id}
                elementType={vl.config.elementType}
                elementConfig={vl.config.elementConfig}
                value={vl.config.value}
                handleChanged={(event) => this.handleChange(event, vl.id)}
                invalid={!vl.config.valid}
                shouldValidate={vl.config.validation}
                touched={vl.config.touched}
              />
            );
          })}
          <Button btnType="Success" disabled={!this.state.isFormValid}>
            Order Now
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
