import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { red500 } from 'material-ui/styles/colors';
import Form from '../common/Form/Form';
import Logo from '../../public/images/Logo.png';

import './auth.scss';

class PasswordReset extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };
  }

  @autobind
  handleOnChange(evt) {
    this.setState({ email: evt.target.value });
  }

  render() {
    return (
      <div className="auth-container">
        <div className="auth-container__header">
          <h2>Reset Password</h2>
          <div className="auth-container__logo">
            <img src={Logo} role="presentation" />
          </div>
        </div>
        <Form>
          <div className="auth-container__textfield-container">
            <p>Enter in your email to request a password reset.</p>
            <TextField
              className="auth-container__textfield"
              floatingLabelFocusStyle={{ color: red500 }}
              underlineFocusStyle={{ borderColor: red500 }}
              floatingLabelText="Email"
              name="email"
              onChange={this.handleOnChange}
            />
            <RaisedButton
              label="Submit"
              className="auth-container__cta"
              backgroundColor={red500}
              labelColor="#FFF"
              type="submit"
            />
          </div>
        </Form>
      </div>
    );
  }
}

export default PasswordReset;
