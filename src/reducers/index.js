import { combineReducers } from "redux";

import {
  STORE_AUTH_GOOGLE,
  SIGN_IN_WITH_GOOGLE,
  SIGN_OUT_WITH_GOOGLE,
  SIGN_UP_WITH_LOCAL,
  SIGN_IN_WITH_LOCAL,
  SIGN_OUT_WITH_LOCAL,
  LOADING,
  POPUP,
  LAZY,
  ERROR_OCCURR
} from "../actions/types";



//* authenticated reducers 
const initialAuth = {
  authStore: null,
  isAuthenticated: false,
  method: undefined,
  userId: undefined
};
const authReducer = (state = initialAuth, action) => {
  switch (action.type) {

    case STORE_AUTH_GOOGLE:
      return { ...state, authStore: action.payload };

    case SIGN_IN_WITH_GOOGLE:
      return { ...state, ...action.payload };

    case SIGN_OUT_WITH_GOOGLE:
      return { ...state, ...action.payload };

    case SIGN_UP_WITH_LOCAL:      
      return state

    case SIGN_IN_WITH_LOCAL:      
      return { ...state, ...action.payload };

    case SIGN_OUT_WITH_LOCAL:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};


//* Utils Reducers ( like loading, modal, popup, error )
const initialUtils = {
  isLoading: false,
  isOpenPopup: false,
  isLazy: false,
  error: null
};
const utilsReducer = (state = initialUtils, action) => {
  switch (action.type) {

    case LOADING:
      return { ...state, isLoading: action.payload };

    case POPUP:
      return { ...state, isOpenPopup: action.payload };

    case LAZY:
      console.log('Lagy reducer ', action.payload);
      return { ...state, isLazy: action.payload };

    case ERROR_OCCURR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};


export default combineReducers({
  auth: authReducer,
  utils: utilsReducer
});
