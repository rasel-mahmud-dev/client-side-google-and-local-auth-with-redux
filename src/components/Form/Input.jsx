import React from "react";

import "./Input.scss";

class Input extends React.Component {
  state = {
    isClicked: false
  };

  onClickHandle = () => {
    this.setState({ isClicked: true });
  };
  onBlurHandle = () => {
    this.setState({ isClicked: false });
  };

  iconClassNames = [
    "fa",
    this.props.validate !== "success" 
    ? this.props.validate === "fail" ? "i_fail fa fa-times-circle" : ''
    : this.props.validate === "success" ? "i_success fa fa-check-circle" : ""
  ];

  inputAreaClassNames = [
    "input_area",
    this.props.validate === "fail" ? "error_input" : "",
    this.props.validate === "success" ? "success_input" : ""
  ];

  inputAreaClassNames = () => {
    let inputAreaClassNames = [
      "input_area",
      this.props.validate === "fail" ? "error_input" : "",
      this.props.validate === "success" ? "success_input" : ""
    ];

    if (this.state.isClicked) {
      inputAreaClassNames.push("input_active");
    }
    return inputAreaClassNames;
  };

  renderLoading = () => {
    return (
      <div className="input_loading">
        <span />
        <span />
        <span />
      </div>
    );
  };

  render() {
    return (
      <div className="input_group">
        <label htmlFor="" className="label">
          {this.props.label}
        </label>
        <div className={this.inputAreaClassNames().join(" ")}>
          <input
            name={this.props.name}
            className="input"
            type={this.props.type || "text"}
            value={this.props.value}
            onChange={this.props.onChange}
            onClick={this.onClickHandle}
            onBlur={this.onBlurHandle}
          />

          {this.props.validate === "checking" ? (
            this.renderLoading()
          ) : (
            <span className="input_validate_icon">
              <i className={this.iconClassNames.join(" ")} />
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default Input;
