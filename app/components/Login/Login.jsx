import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import logo from '../../public/images/Logo.png';

import './Login.scss';

const materialPrimaryColor = '#F44336';

const Login = () => (
  <div className="login-container">
    <Paper className="login-form" zDepth={1}>
      <div className="logo-container">
        <img src={logo} role="presentation" className="login-logo" />
      </div>
      <div className="login-header">
        <h2 style={{ textAlign: 'center' }}>Login</h2>
      </div>
      <div className="login-textfield-container">
        <TextField
          className="login-textfield"
          floatingLabelFocusStyle={{ color: materialPrimaryColor }}
          underlineFocusStyle={{ borderColor: materialPrimaryColor }}
          floatingLabelText="Email"
        />
        <TextField
          className="login-textfield"
          floatingLabelFocusStyle={{ color: materialPrimaryColor }}
          underlineFocusStyle={{ borderColor: materialPrimaryColor }}
          floatingLabelText="Password"
          type="password"
        />
        <RaisedButton
          label="Login"
          className="loginBtn"
          backgroundColor={materialPrimaryColor}
          labelColor="#FFF"
        />
        <p>Don't have an account? <span style={{ color: materialPrimaryColor }}>Sign up</span></p>
      </div>
    </Paper>
  </div>
);

export default Login;
