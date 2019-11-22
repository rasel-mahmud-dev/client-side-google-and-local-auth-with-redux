import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { storeAuth, autoLogin, changesAuthState } from "./actions/auth";
import { dismissPopupError } from "./actions/utils";

import PopopMessage from "./components/PopupMessage/PopupMessage";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./pages/Home";

import googleAuth from "./apis/googleAuth";
import "./apis/api";
import "./App.scss";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

class App extends Component {
  componentDidMount() {
    // for local email and password ( auto Login )
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const method = localStorage.getItem("method");
    if (userId && email && method == "Local") {
      return this.props.autoLogin();
    }

    //* load GoogleAuth gapi.......
    googleAuth(auth => {
      //  GoogleAuth store inside state.........
      this.props.storeAuth(auth);

      // initially check isSignin
      this.props.changesAuthState(auth.isSignedIn.get());

      //listener when isSignin Change Hobe then imediately call hobe
      auth.isSignedIn.listen(() => {
        this.props.changesAuthState(auth.isSignedIn.get());
      });
    });
  }

  render() {
    const { utils, auth } = this.props;

    return (
      <div className="App">
        <header className="main_header">
          <Navigation />
        </header>
        <div className="h-39" />

        {utils.isLazy && (
          <PopopMessage
            error={utils.error}
            isOpenPopup={utils.isOpenPopup}
            onDismissPopupMessasge={this.props.dismissPopupError}
          />
        )}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    utils: state.utils
  };
};

export default connect(
  mapStateToProps,
  { storeAuth, autoLogin, changesAuthState, dismissPopupError }
)(App);
