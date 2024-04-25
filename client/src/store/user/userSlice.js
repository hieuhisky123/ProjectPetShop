// ActionTypes
const REGISTER = 'user/register';

// Action creators
export const register = (userData, token) => ({
  type: REGISTER,
  payload: { isLoggedIn: true, current: userData, token },
});

// Initial state
const initialState = {
  isLoggedIn: false,
  current: null,
  token: null,
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
        console.log(action);
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        current: action.payload.current,
        token: action.payload.token,
      };
    default:
      return state;
  }
};


export default userReducer;
