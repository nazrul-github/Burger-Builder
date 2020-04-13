import React, { useEffect } from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";
import { connect } from "react-redux";

const controls = [
  { label: "Salad", type: "salad", price: 0.5 },
  { label: "Bacon", type: "bacon", price: 0.7 },
  { label: "Cheese", type: "cheese", price: 0.4 },
  { label: "Meat", type: "meat", price: 1.3 },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>{" "}
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          addIngridient={() => props.addIngridient(ctrl.type, ctrl.price)}
          removeIngridient={() => props.removeIngridient(ctrl.type, ctrl.price)}
          emptyIngridients={props.emptyIngridients[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={() => props.ordered()}
      >
        ORDER NOW
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ing: state.ing.ingridients,
  };
};
export default connect(mapStateToProps)(buildControls);
