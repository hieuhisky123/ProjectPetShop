import actionTypes from "../actions/actionTypes";

const initialState = {
  name: "vinh",
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "123":
      break;

    default:
      return state;
  }
};

export default appReducer;
