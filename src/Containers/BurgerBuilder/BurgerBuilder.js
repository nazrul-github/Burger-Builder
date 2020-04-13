import React, { Component } from "react";
import Wrapper from "../../HOC/Wrapper";
import Burger from "../../Components/Burger/Burger";
import Buildcontrols from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/WithErrorHandler";
import { Switch } from "react-router-dom";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export class BurgerBuilder extends Component {
  state = {
    ingridients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props.price);
    // axios
    //   .get("/ingridients.json")
    //   .then((res) => {
    //     this.setState({ ingridients: res.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
  }

  //Add and remove ingridient are handled by reducer. 

  // addIngridientHandler = (type) => {
  //   const updatedIngridients = {
  //     ...this.state.ingridients,
  //   };
  //   updatedIngridients[type] += 1;
  //   const priceAddition = INGRIDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ ingridients: updatedIngridients, totalPrice: newPrice });
  //   this.updatePurchaseState(updatedIngridients);
  // };

  // removeIngridientHandler = (type) => {
  //   const updatedIngridients = {
  //     ...this.state.ingridients,
  //   };
  //   if (updatedIngridients[type] > 0) {
  //     updatedIngridients[type] -= 1;
  //     const priceAddition = INGRIDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceAddition;
  //     this.setState({ ingridients: updatedIngridients, totalPrice: newPrice });
  //     this.updatePurchaseState(updatedIngridients);
  //   }
  // };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.props.history.push("/");
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const queries = [];

    // for (const Ingridient in this.state.ingridients) {
    //   queries.push(
    //     encodeURIComponent(Ingridient) +
    //       "=" +
    //       encodeURIComponent(this.state.ingridients[Ingridient])
    //   );
    // }
    // queries.push(
    //   encodeURIComponent("totalPrice") +
    //     "=" +
    //     encodeURIComponent(this.state.totalPrice.toFixed(2))
    // );
    // const query = queries.join("&");
    this.props.history.push({
      pathname: "/checkout",
      // search: "?" + query,
    });

    // this.setState({ loading: true });
    // const order = {
    //   ingridients: this.state.ingridients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Robin",
    //     address: "Paik Para",
    //     zipCode: "1216",
    //     country: "Germany"
    //   },
    //   email: "test@test.com",
    //   deliveryMethod: "fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({ loading: false, purchasing: false });
    //   });

    // alert("Your order has been placed");
  };

  updatePurchaseState = (ingridients) => {
    const sum = Object.keys(ingridients)
      .map((key) => {
        return ingridients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // let sum = 0;
    // for (const key in ingridients) {
    //   sum += ingridients[key];
    // }
    //Learn reduce method and map method in detail
    // this.setState({ purchasable: sum > 0 });
    return sum > 0;
  };

  render() {
    const allIngridients = {
      ...this.props.ing,
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
    if (this.props.ing !== null) {
      isIngridientAvailable = (
        <Wrapper>
          <Burger ingridients={this.props.ing} />
          {/* <IngridientContext.Provider
          value={{
            addIngridient: this.addIngridientHandler,
            removeIngridient: this.removeIngridientHandler
          }}
        > */}
          <Buildcontrols
            addIngridient={this.props.addIngridient}
            removeIngridient={this.props.removeIngridient}
            emptyIngridients={allIngridients}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
          />
        </Wrapper>
      );

      orderSummary = (
        <OrderSummary
          ingridients={this.props.ing}
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
        <Switch>
          {/* <Route
            path={this.props.match.url + "/checkout"}
            exact
            render={props => (
              <Checkout {...props} ingridients={this.state.ingridients} />
            )}
          /> */}
        </Switch>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.ing.ingridients,
    price: state.ing.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngridient: (ingType, price) => {
      dispatch({
        type: actionTypes.ADD_INGRIDIENT,
        ingType: ingType,
        price:price,
      });
    },
    removeIngridient: (ingType, price) => {
      dispatch({
        type: actionTypes.REMOVE_INGRIDIENT,
        ingType: ingType,
        price:price,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
