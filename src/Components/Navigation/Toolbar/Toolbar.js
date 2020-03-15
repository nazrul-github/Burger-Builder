import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation Items/NavigationItems";
import HamBurgerSwitch from "../Toolbar/HamBurgerMenuSwitch/HamBurgerMenuSwitch";
import classes from "./Toolbar.module.css";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.MobileOnly}>
        <HamBurgerSwitch toggle={props.toggle} />
      </div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
