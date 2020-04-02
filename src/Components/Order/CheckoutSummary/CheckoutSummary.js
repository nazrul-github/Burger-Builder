import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
import PropTypes from "prop-types";

const CheckoutSummary = ({
  ingridients,
  checkoutCancelled,
  checkoutContinued
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it's taste well</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingridients={ingridients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingridients: PropTypes.object.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
  checkoutCancelled: PropTypes.func.isRequired
};

export default CheckoutSummary;
