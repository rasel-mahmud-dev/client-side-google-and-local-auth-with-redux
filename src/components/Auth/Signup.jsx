import React, { Component } from "react";
import { connect } from "react-redux";
import { localSignup } from "../../actions/auth";

import Input from "../Form/Input";

import "./Login.scss";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };
  logInwithGoogle = () => {
    this.props.login();
    this.props.history.push("/");
  };

  submitHandler = event => {
    event.preventDefault();

    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    this.props.localSignup(userData);
    this.setState({ email: "", password: "", username: "" });
    // this.props.history.push("/");
  };

  inpuValidator = ()=>{
    
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: [event.target.value]
    });


  };

  render() {
    return (
      <div className="container">
        <h2>Register Here</h2>
        <form onSubmit={this.submitHandler}>
          <div className="input_group">
            <Input
              label="Username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.changeHandler}
            />
          </div>
          <div className="input_group">
            <Input
              validate=""
              value={this.state.email}
              label="Email"
              name="email"
              type="email"
              onChange={this.changeHandler}
            />
          </div>

          <div className="input_group">
            <Input
              validate=""
              value={this.state.password}
              label="Password"
              name="password"
              type="password"
              onChange={this.changeHandler}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { localSignup }
)(Signup);
