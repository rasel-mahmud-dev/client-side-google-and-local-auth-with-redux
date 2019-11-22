import React from "react";
import { connect } from 'react-redux'
import { login } from '../../actions/auth'

import googleIcon from '../../Image/Logo/google.webp'

const Google = (props) => {
  return (
    <div onClick={props.login} className="google">
      <div className="google_signIn">
        <div className="google_logo">
          <img src={googleIcon} alt="google logo" />
        </div>
        <div className="text">Sign in with Google</div>
      </div>
    </div>
  );
};

export default connect(null, { login})(Google);
