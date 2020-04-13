import * as actionTypes from "../actions";

const initialState = {
  ingridients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const reducer = (state = initialState, { type, ingType, price }) => {
  switch (type) {
    case actionTypes.ADD_INGRIDIENT:
      const updatedIngridients = { ...state.ingridients };
      updatedIngridients[ingType] += 1;

      return {
        ...state,
        ingridients: updatedIngridients,
        totalPrice: state.totalPrice + price,
      };
    case actionTypes.REMOVE_INGRIDIENT:
      const oldIngridients = { ...state.ingridients };
      oldIngridients[ingType] -= 1;
      return {
        ...state,
        ingridients: oldIngridients,
        totalPrice: state.totalPrice - price,
      };
    default:
      return state;
  }
};
export default reducer;
