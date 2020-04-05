import React from "react";
import classes from "../Navigation Items/Navigation Item/NavigationItem.module.css";
import styles from "./NavigationItems.module.css";
import { NavLink } from "react-router-dom";

const navigationItems = () => {
  return (
    <ul className={styles.NavigationItems}>
      <li className={classes.NavigationItem}>
        <NavLink to={{ pathname: "/" }} exact activeClassName={classes.active}>
          Burger Builder
        </NavLink>
      </li>
      <li className={classes.NavigationItem}>
        <NavLink to={{ pathname: "/orders" }} activeClassName={classes.active}>
          Orders
        </NavLink>
      </li>
    </ul>
  );
};

export default navigationItems;
