import React, { Component } from "react";
import Wrapper from "../../HOC/Wrapper";
import Burger from "../../Components/Burger/Burger";
import Buildcontrols from "../../Components/Burger/BuildControls/BuildControls";
import IngridientContext from "../../Context/IngridientContext";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngridientHandler = type => {
    const updatedIngridients = {
      ...this.state.ingridients
    };
    updatedIngridients[type] += 1;
    const priceAddition = INGRIDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingridients: updatedIngridients, totalPrice: newPrice });
  };

  removeIngridientHandler = type => {
    const updatedIngridients = {
      ...this.state.ingridients
    };
    if (updatedIngridients[type] > 0) {
      updatedIngridients[type] -= 1;
      const priceAddition = INGRIDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceAddition;
      this.setState({ ingridients: updatedIngridients, totalPrice: newPrice });
    }
  };

  render() {
    const allIngridients = {
      ...this.state.ingridients
    };
    const emptyIngridients = [];
    for (const key in allIngridients) {
      allIngridients[key] = allIngridients[key] <= 0;
    }

    return (
      <Wrapper>
        <Burger ingridients={this.state.ingridients} />
        {/* <IngridientContext.Provider
          value={{
            addIngridient: this.addIngridientHandler,
            removeIngridient: this.removeIngridientHandler
          }}
        > */}
        <Buildcontrols
          addIngridient={this.addIngridientHandler}
          removeIngridient={this.removeIngridientHandler}
          emptyIngridients={allIngridients}
          price={this.state.totalPrice}
        />
        {/* </IngridientContext.Provider> */}
      </Wrapper>
    );
  }
}

export default BurgerBuilder;
