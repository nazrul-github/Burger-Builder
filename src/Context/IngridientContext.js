import React, { createContext } from "react";

const ingridientContext = React.createContext({
  addIngridient: () => {},
  removeIngridient: () => {}
});

export default ingridientContext;
