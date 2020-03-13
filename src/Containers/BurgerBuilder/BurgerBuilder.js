import React, { Component } from "react";
import Wrapper from "../../HOC/Wrapper";
import Burger from "../../Components/Burger/Burger";
import Buildcontrols from "../../Components/Burger/BuildControls/BuildControls";
import IngridientContext from "../../Context/IngridientContext";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";

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
    totalPrice: 4,
    purchasable: false,
    purchasing: false
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
    this.updatePurchaseState(updatedIngridients);
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
      this.updatePurchaseState(updatedIngridients);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("Your order has been placed");
  };

  updatePurchaseState = ingridients => {
    const sum = Object.keys(ingridients)
      .map(key => {
        return ingridients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    //Learn reduce method and map method in detail
    this.setState({ purchasable: sum > 0 });
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
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingridients={this.state.ingridients}
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
          />
        </Modal>
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
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
        {/* </IngridientContext.Provider> */}
      </Wrapper>
    );
  }
}

export default BurgerBuilder;
