import actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.productData,
      };

    default:
      return state;
  }
};

export default appReducer;
