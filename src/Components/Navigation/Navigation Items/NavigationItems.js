import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./Navigation Item/NavigationItem";

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">Checkout </NavigationItem>
    </ul>
  );
};

export default navigationItems;
