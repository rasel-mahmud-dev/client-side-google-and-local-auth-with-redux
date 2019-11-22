
import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, localLogout } from "../../actions/auth";
import { NavLink, Link } from 'react-router-dom'

import './Navigation.scss'

class Navigation extends Component {

  logoutWithGoogle = () => {
    alert("logout with google");
  };

  render() {
    const { auth, utils } = this.props   
    
    return (
      <nav className="main-nav">
        <ul className="nav-items">
          <li className="item">
            <NavLink className="link" exact to="/">
              Home
            </NavLink>
          </li>
  
        </ul>
        {auth.isAuthenticated ? (
          <ul className="auth-menu">
            <li className="item logout_item">
              <a className="link logout-button" 
              onClick={
                auth.method == "Google" 
                ? this.props.logout
                : this.props.localLogout
              }>Logout RaseL</a>
              <img className="avatar" src={auth.avatar} alt="avatar"/>
            </li>
          </ul>
        ) : (
          <ul className="auth-menu">
            <li className="item">
              <NavLink className="link" to="/signup">
                Signup
              </NavLink>
            </li>
  
            <li className="item">
              <NavLink className="link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}


const mapStateToProps = (state)=>{
  return {
    auth: state.auth,
    utils: state.utils
  }
}

export default connect(mapStateToProps, { logout, localLogout })(Navigation);
