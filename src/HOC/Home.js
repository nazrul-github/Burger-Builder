import React from "react";
import Layout from "./Layouts/Layout";
import { Route, Switch } from "react-router-dom";
import { BurgerBuilder } from "../Containers/BurgerBuilder/BurgerBuilder";
import Checkout from "../Containers/Checkout/Checkout";

export const Home = props => {
  return (
    <Layout>
      <Switch>
        <Route path="/burger-builder" component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route render={() => <h1>No page found</h1>} />
      </Switch>
    </Layout>
  );
};
export default Home;
