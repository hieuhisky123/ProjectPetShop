import * as actions from './asyncAction';
import { GET_CURRENT_FULFILLED, GET_CURRENT_PENDING, GET_CURRENT_REJECTED } from '../actions/actionTypes';

// ActionTypes
const REGISTER = 'user/register';
const LOGOUT = "user/logout";
// Initial state
const initialState = {
  isLoggedIn: false,
  current: null,
  token: null,
  isLoading: false,
};

// Action creators
export const register = (userData, token) => ({
  type: REGISTER,
  payload: { isLoggedIn: true, current: userData, token },
});


export const logout = () => ({
  type: LOGOUT,
});
// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        current: action.payload.current,
        token: action.payload.current.token,
      };
    case GET_CURRENT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CURRENT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        current: action.payload,
      };
    case GET_CURRENT_REJECTED:
      return {
        ...state,
        isLoading: false,
        current: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        current: null,
        token: null,
      };  
    default:
      return state;
  }
};

export default userReducer;
