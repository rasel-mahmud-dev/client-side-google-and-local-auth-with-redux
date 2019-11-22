import axios from "axios";
const apiUri = "http://localhost:3001";

const jsonServerApi = axios.create({
  baseURL: apiUri
});

import {
  STORE_AUTH_GOOGLE,
  SIGN_IN_WITH_GOOGLE,
  SIGN_OUT_WITH_GOOGLE,
  SIGN_UP_WITH_LOCAL,
  SIGN_IN_WITH_LOCAL,
  SIGN_OUT_WITH_LOCAL
} from "../actions/types";

import {
  emergencyDismissPopupError,
  dismissPopupError,
  errorHandle
} from "./utils.js";

//* Google authenticated.........
export const storeAuth = auth => {
  return {
    type: STORE_AUTH_GOOGLE,
    payload: auth
  };
};

/* 
* Login with Google Step ==>
==> sign in with accout.
==> get Current userId.
==> check your database this user id exist or not, (2)
==> if not you need register with current google user id,
==> now dispatch action to change your state.
==> Then next time ( for 2 true ) you can direct 
    call dispatch to change your state.
*/

export const login = () => {
  return async (dispatch, getState) => {
    getState().auth.authStore.signIn();

    if (!getState().auth.authStore.isSignedIn.get()) return;

    let currentUserId = getState()
      .auth.authStore.currentUser.get()
      .getId();

    let payload = {
      isAuthenticated: true,
      userId: currentUserId,
      method: "Google",
      avatar: getState()
        .auth.authStore.currentUser.get()
        .getBasicProfile()
        .getImageUrl()
    };

    dispatch({
      type: SIGN_IN_WITH_GOOGLE,
      payload: payload
    });
  };
};

export const changesAuthState = isSignedIn => async (dispatch, getState) => {
  if (isSignedIn) {
    let currentUserId = getState()
      .auth.authStore.currentUser.get()
      .getId();
    console.log(currentUserId);

    let payload = {
      isAuthenticated: true,
      userId: currentUserId,
      method: "Google",
      avatar: getState()
        .auth.authStore.currentUser.get()
        .getBasicProfile()
        .getImageUrl()
    };

    dispatch({
      type: SIGN_IN_WITH_GOOGLE,
      payload: payload
    });
  }
};

export const logout = () => {
  return async (dispatch, getState) => {
    getState().auth.authStore.signOut();

    let currentUserId = getState()
      .auth.authStore.currentUser.get()
      .getId();
    console.log(currentUserId);

    let payload = {
      isAuthenticated: false,
      userId: currentUserId,
      method: undefined,
      avatar: undefined
    };

    dispatch({
      type: SIGN_OUT_WITH_GOOGLE,
      payload: payload
    });
  };
};
//* End

//* Local Authenticated........
export const localSignup = userData => {
  return async dispatch => {
    dismissPopupError();
    let response = await axios.post(apiUri + "/users", userData);
    let payload = {
      isAuthenticated: true,
      method: "Local",
      userId: response.id,
      email: response.email
    };

    dispatch({
      type: SIGN_UP_WITH_LOCAL,
      payload: payload
    });
  };
};

export const localLogin = userData => async dispatch => {
  dispatch(emergencyDismissPopupError());
  try {
    let { data } = await axios.get(apiUri + "/users");
    let user = data.find(user => user.email == userData.email);
    if (!user) {
      dispatch(errorHandle("This Email Not yet Registered..."));
      return;
    }
    if (user.password !== userData.password) {
      dispatch(errorHandle("Password Doesn't match..."));
      return;
    }

    localStorage.setItem("userId", user.id);
    localStorage.setItem("email", user.email);
    localStorage.setItem("method", "Local");

    let payload = {
      isAuthenticated: true,
      method: "Local",
      userId: user.id,
      email: userData.email
    };
    dispatch({ type: SIGN_IN_WITH_LOCAL, payload: payload });
  } catch (err) {
    dispatch(errorHandle(err.toString()));
  }
};

export const localLogout = () => async dispatch => {
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");

  let { data } = await axios.get(apiUri + "/users");
  let user = data.find(user => user.email == email && user.id == userId);
  if (!user) return;
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("method");

  let payload = {
    isAuthenticated: false,
    method: undefined,
    userId: undefined,
    email: undefined
  };
  dispatch({ type: SIGN_OUT_WITH_LOCAL, payload: payload });
};

export const autoLogin = () => dispatch => {
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  let payload = {
    isAuthenticated: true,
    method: "Local",
    userId: userId,
    email: email
  };
  dispatch({ type: SIGN_IN_WITH_LOCAL, payload: payload });
};
