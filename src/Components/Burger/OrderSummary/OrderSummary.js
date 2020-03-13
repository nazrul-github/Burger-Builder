import React from "react";
import Wrapper from "../../../HOC/Wrapper";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingridientsSummary = Object.keys(props.ingridients).map((igKey, i) => {
    return (
      <li key={i}>
        <span style={{ textTransform: "capitalize" }}>{igKey}: </span>
        {props.ingridients[igKey]}
      </li>
    );
  });

  return (
    <Wrapper>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingridients</p>
      <ul>{ingridientsSummary}</ul>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continue}>
        CONTINUE
      </Button>
    </Wrapper>
  );
};

export default orderSummary;
