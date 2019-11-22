import React, { Component } from "react";
import { connect } from "react-redux";
import { login, localLogin } from "../../actions/auth";
import { Link } from "react-router-dom";

import avatar from "../../Image/avatar/img_avatar2.png";

import Google from "./Google";
import "./Login.scss";
import Button from "../Button/Button";
import Input from "../Form/Input";


class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  logInwithGoogle = () => {
    this.props.login();
    this.props.history.push("/");
  };

  submitHandler = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.localLogin(userData);
    this.setState({ email: "", password: "" });
  };

  validate= (field)=>{
    let errors = {}    
    for(let prop in field ){
      if(prop == 'email'){                
        if(!field[prop]){
          errors[prop] = "Not Allowed Empty"
        }
        if(field[prop] && field[prop].length <= 3){
          errors[prop] = "Not Allowed min 4 Character"
        }
      }

      if(prop == 'password'){
        if(!field[prop]){          
          errors[prop] = "Not Allowed Empty"
        }
        if(field[prop] && field[prop].length <= 3){
          errors[prop] = "Not Allowed min 4 Character"
        }
      }
    }
    return Object.keys(errors).length == 0 ? null : errors
  }



  handleChange = e => {
    let validate = this.validate({[e.target.name] : e.target.value})
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errors: validate
    });
  };

  render() {    
    return (
      <div className="container">
        <div className="login_form">
          <div className="user_avatar">
            <img src={avatar} alt="" />
          </div>
          <h1>Login</h1>
          <Google />
          <span className="or">Or</span>
          <form onSubmit={this.submitHandler}>
            <Input
              validate={this.state.errors && this.state.errors.email ? 'success' : 'fail'}
              value={this.state.email}
              label="Email"
              name="email"
              onChange={this.handleChange}
            />
            <Input
              validate=""
              value={this.state.password}
              label="Password"
              name="password"
              onChange={this.handleChange}
            />

            <Link className="forget_password_link" to="/">
              Forget Password ?
            </Link>
            <Button value="Login" type="login" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { login, localLogin }
)(Login);
