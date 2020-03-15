import React from "react";
import classes from "./HumBurgerMenuSwitch.module.css";

const showAnimation = x => {
  console.log("class is changed");
};

const hamBurgerMenuSwitch = props => {
  return (
    <div className={classes.container} onClick={props.toggle}>
      <div className={classes.bar1}></div>
      <div className={classes.bar2}></div>
      <div className={classes.bar3}></div>
    </div>
  );
};

export default hamBurgerMenuSwitch;
