import React, { Component } from "react";
import Wrapper from "../../HOC/Wrapper";
import Burger from "../../Components/Burger/Burger";
import Buildcontrols from "../../Components/Burger/BuildControls/BuildControls";
import IngridientContext from "../../Context/IngridientContext";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/WithErrorHandler";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export class BurgerBuilder extends Component {
  state = {
    ingridients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingridients.json")
      .then(res => {
        this.setState({ ingridients: res.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

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
    this.setState({ loading: true });
    const order = {
      ingridients: this.state.ingridients,
      price: this.state.totalPrice,
      customer: {
        name: "Robin",
        address: "Paik Para",
        zipCode: "1216",
        country: "Germany"
      },
      email: "test@test.com",
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false, purchasing: false });
      });

    // alert("Your order has been placed");
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
    let orderSummary = null;

    let isIngridientAvailable = this.state.error ? (
      <p>Ingridient can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingridients !== null) {
      isIngridientAvailable = (
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
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Wrapper>
      );

      orderSummary = (
        <OrderSummary
          ingridients={this.state.ingridients}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      //If the loading is true we are showing the spinner
      orderSummary = <Spinner />;
    }

    return (
      <Wrapper>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {isIngridientAvailable}
        {/* </IngridientContext.Provider> */}
      </Wrapper>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
