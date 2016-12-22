import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './PasswordReset.scss';

const materialPrimaryColor = '#F44336';

class PasswordReset extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(evt) {
    this.setState({ email: evt.target.value });
  }

  render() {
    return (
      <form className="reset-container">
        <Paper className="reset-form">
          <div className="reset-header">
            <h1>Reset Password</h1>
            <p>Enter in your email to request a password reset.</p>
          </div>
          <TextField
            className="reset-input"
            floatingLabelFocusStyle={{ color: materialPrimaryColor }}
            underlineFocusStyle={{ borderColor: materialPrimaryColor }}
            floatingLabelText="Email"
            name="email"
            onChange={this.handleOnChange}
          />
          <RaisedButton
            label="Submit"
            className="resetBtn"
            backgroundColor={materialPrimaryColor}
            labelColor="#FFF"
            type="submit"
          />
        </Paper>
      </form>
    );
  }
}

export default PasswordReset;
