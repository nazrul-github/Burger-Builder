import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation Items/NavigationItems";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Wrapper from "../../../HOC/Wrapper";
import HamburgerMenuSwitch from "../Toolbar/HamBurgerMenuSwitch/HamBurgerMenuSwitch";
import classes from "./SideDrawer.module.css";

const sideDrawer = props => {
  // ...
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Wrapper>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Wrapper>
  );
};

export default sideDrawer;
