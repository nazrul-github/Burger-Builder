import React from "react";
import classes from "./Burger.module.css";
import BurgerIngridient from "./BurgerIngredient/BurgerIngridient";
import PropTypes from "prop-types";

const Burger = ({ ingridients }) => {
  let transformedIngridients = Object.keys(ingridients)
    .map(igKey => {
      return [...Array(ingridients[igKey])].map((_, i) => {
        return <BurgerIngridient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngridients.length === 0) {
    transformedIngridients = <p>Please start adding ingridients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngridient type="bread-top" />
      {transformedIngridients}
      <BurgerIngridient type="bread-bottom" />
    </div>
  );
};
Burger.propTypes = {
  ingridients: PropTypes.object.isRequired
};
export default Burger;
