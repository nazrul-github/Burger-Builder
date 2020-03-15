import React, { useContext } from "react";
// import React from "react";
import PropTypes from "prop-types";
import classes from "./BuildControl.module.css";
import IngridientContext from "../../../../Context/IngridientContext";

const BuildControl = props => {
  const ingridientContext = useContext(IngridientContext);

  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removeIngridient}
        disabled={props.emptyIngridients}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.addIngridient}>
        More
      </button>
    </div>
  );
};

BuildControl.propTypes = {
  removeIngridient: PropTypes.func.isRequired,
  addIngridient: PropTypes.func.isRequired,
  emptyIngridients: PropTypes.bool.isRequired
};

export default BuildControl;
