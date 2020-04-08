import React from "react";
import classes from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ btnType, clicked, children, disabled }) => {
  return (
    <button
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={clicked}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
