import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";
import { createPortal } from "react-dom";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>{" "}
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          addIngridient={() => props.addIngridient(ctrl.type)}
          removeIngridient={() => props.removeIngridient(ctrl.type)}
          emptyIngridients={props.emptyIngridients[ctrl.type]}
        />
      ))}
    </div>
  );
};

export default buildControls;
