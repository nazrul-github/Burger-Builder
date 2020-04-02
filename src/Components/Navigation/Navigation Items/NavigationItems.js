import React from "react";
import classes from "../Navigation Items/Navigation Item/NavigationItem.module.css";
import styles from "./NavigationItems.module.css";
import { NavLink } from "react-router-dom";

const navigationItems = () => {
  return (
    <ul className={styles.NavigationItems}>
      <li className={classes.NavigationItem}>
        <NavLink
          to={{ pathname: "/burger-builder" }}
          activeClassName={classes.active}
        >
          Burger Builder
        </NavLink>
      </li>
      <li className={classes.NavigationItem}>
        <NavLink
          to={{ pathname: "/checkout" }}
          activeClassName={classes.active}
        >
          Checkout
        </NavLink>
      </li>
    </ul>
  );
};

export default navigationItems;
