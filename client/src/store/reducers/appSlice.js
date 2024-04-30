// Import action types
import { SHOW_MODAL } from '../actions/actionTypes';

// Define initial state
const initialState = {
    isShowModal: false,
    modalChildren: null
};

// Define action creators
export const showModal = (isShowModal, modalChildren) => ({
    type: SHOW_MODAL,
    payload: {
        isShowModal,
        modalChildren
    }
});

// Define reducer function
const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isShowModal: action.payload.isShowModal,
                modalChildren: action.payload.modalChildren
            };
        default:
            return state;
    }
};

export default modalReducer;



