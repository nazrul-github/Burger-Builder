import React, { Component } from "react";
import Wrapper from "../../HOC/Wrapper";
import styles from "./Layout.module.css";
import ToolBar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

export class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggle = () => {
    this.setState((state, props) => {
      return {
        showSideDrawer: !state.showSideDrawer
      };
    });
  };

  render() {
    return (
      <Wrapper>
        <ToolBar toggle={this.sideDrawerToggle} />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles.content}>{this.props.children}</main>
      </Wrapper>
    );
  }
}

export default Layout;
