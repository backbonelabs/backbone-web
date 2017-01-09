import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { red500 } from 'material-ui/styles/colors';
import Form from '../common/Form/Form';

import './PasswordReset.scss';

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
      <div className="reset-container">
        <Form paperStyle="reset-form">
          <div className="reset-header">
            <h1>Reset Password</h1>
            <p>Enter in your email to request a password reset.</p>
          </div>
          <TextField
            className="reset-input"
            floatingLabelFocusStyle={{ color: red500 }}
            underlineFocusStyle={{ borderColor: red500 }}
            floatingLabelText="Email"
            name="email"
            onChange={this.handleOnChange}
          />
          <RaisedButton
            label="Submit"
            className="reset-btn"
            backgroundColor={red500}
            labelColor="#FFF"
            type="submit"
          />
        </Form>
      </div>
    );
  }
}

export default PasswordReset;
