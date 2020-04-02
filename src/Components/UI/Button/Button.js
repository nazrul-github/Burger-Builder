import React from "react";
import classes from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ btnType, clicked, children }) => {
  return (
    <button
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={clicked}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Button;
