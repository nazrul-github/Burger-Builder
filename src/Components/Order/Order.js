import React from "react";
import PropTypes from "prop-types";
import classes from "./Order.module.css";

const Order = ({ ingridients, totalPrice, address, name, email }) => {
  let addresses = [];
  for (const key in address) {
    addresses.push(
      <p key={key}>
        {key}: {address[key]}
      </p>
    );
  }
  let allIngridients = [];
  for (const key in ingridients) {
    allIngridients.push(
      <span
        key={key}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          marginRight: " 8px",
          border: "1px solid #ccc",
          padding: " 5px",
        }}
      >
        {key}: {ingridients[key]}
      </span>
    );
  }
  return (
    <div className={classes.Order}>
      <span>Ingridients: </span> {allIngridients}
      {addresses}
      <p>{name}</p>
      <p>{email}</p>
      <p>
        Price: <strong>USD {totalPrice}</strong>
      </p>
    </div>
  );
};

Order.propTypes = {
  ingridients: PropTypes.object,
  totalPrice: PropTypes.number,
  address: PropTypes.object,
  name: PropTypes.string,
  email: PropTypes.string,
};

export default Order;
