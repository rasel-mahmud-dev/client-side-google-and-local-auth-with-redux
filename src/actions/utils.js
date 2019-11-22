
import {
  LOADING,
  POPUP,
  LAZY,
  ERROR_OCCURR
} from "../actions/types";


export const popupAction = (type, payload)=>{
  return{ type, payload }
}
export const loading = (type, payload)=>{
  return{ type, payload }
}

export const lazyAction = (type, payload)=>{  
  return{ type, payload }
}

export const errorHandle = (payload) => dispatch =>{  
  dispatch({type: ERROR_OCCURR, payload: { message: payload }})
  dispatch(loading(LOADING, false))
  dispatch(lazyAction(LAZY, true))
  dispatch(popupAction(POPUP, true))
}

export const dismissPopupError = () => async dispatch => {  
  dispatch(popupAction(POPUP, false))
  dispatch({type: ERROR_OCCURR, payload: null})

  setTimeout(()=>{
    dispatch(lazyAction(LAZY, false))
  }, 500)
}

export const emergencyDismissPopupError = () => dispatch => {  
  console.log("emergency");
  
  // popupAction(POPUP, false)
  // dispatch({type: ERROR_OCCURR, payload: null})

  dispatch(lazyAction(LAZY, false))
}


