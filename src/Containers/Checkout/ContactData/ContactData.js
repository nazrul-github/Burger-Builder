import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../Components/UI/Input/Input";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

export class ContactData extends Component {
  state = {
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
      for (const key in this.props.orderForm) {
        formData[key] = this.props.orderForm[key].value;
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
    } else {
      alert("Form is not valid");
    }
  };

  handleChange = (event, inputIdentifier) => {
    const value = event.target.value;

    //First we copied the main object
    const updatedOrderForm = { ...this.props.orderForm };

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
    this.props.anOrderForm(updatedOrderForm);
    this.setState({ isFormValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (const key in this.props.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.props.orderForm[key],
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

const mapStateToProps = (state) => {
  return {
    ingridients: state.ing.ingridients,
    totalPrice: state.ing.totalPrice,
    orderForm: state.form.orderForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    anOrderForm: (formData) => {
      dispatch({ type: actionTypes.UPDATED_ORDER_FORM, formData: formData });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
