import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { red500, grey900 } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import Form from '../common/Form/Form';
import * as authActions from '../../actions/auth';
import './PasswordReset.scss';

class PasswordReset extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      inProgress: PropTypes.bool,
      passwordResetError: PropTypes.object,
    }),
    passwordReset: PropTypes.func,
  }
  constructor() {
    super();

    this.state = {
      newPassword: '',
      verifyPassword: '',
      passwordError: '',
      verifyPasswordError: '',
    };
  }

  @autobind
  handleOnChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  @autobind
  handleOnSubmit(evt) {
    evt.preventDefault();
    const { newPassword, verifyPassword } = this.state;
    const stateChanges = {
      passwordError: '',
      verifyPasswordError: '',
    };

    if (newPassword.length < 8) {
      stateChanges.passwordError = 'Password must be at least 8 characters';
      return this.setState(stateChanges);
    }

    if ((newPassword !== verifyPassword)) {
      stateChanges.verifyPasswordError = 'New password and verify password do not match.';
      return this.setState(stateChanges);
    }

    this.props.passwordReset(newPassword, verifyPassword);
    this.setState(stateChanges);
  }

  render() {
    const { verifyPassword, newPassword, passwordError, verifyPasswordError } = this.state;
    const passwordLength = (verifyPassword.length > 0) && (newPassword.length > 0);
    let passwordResetError = this.props.auth.passwordResetError.message;
    // if error message exists
    if (passwordResetError) {
      // if it includes the string token
      if (passwordResetError.includes('token')) {
        passwordResetError = (
          <p style={{ color: red500, width: 350, textAlign: 'center' }}>
            Invalid reset token. Please contact <a href="mailto:support@gobackbone.com">
            support@gobackbone.com</a> for assistance.
          </p>
        );
      }
    }
    return (
      <div className="reset-container">
        <Form paperStyle="reset-form" onSubmit={this.handleOnSubmit}>
          <div className="reset-header">
            <h1>Password Reset</h1>
            <p>Enter your new password in the fields below.</p>
          </div>
          <div className="password-reset-input-container">
            <TextField
              className="password-reset-input"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineFocusStyle={{ borderColor: grey900 }}
              floatingLabelText="New password"
              name="newPassword"
              onChange={this.handleOnChange}
              type="password"
              errorText={passwordError}
              errorStyle={{ textAlign: 'center' }}
            />
            <TextField
              className="password-reset-input"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineFocusStyle={{ borderColor: grey900 }}
              floatingLabelText="Verify password"
              name="verifyPassword"
              type="password"
              onChange={this.handleOnChange}
              errorText={verifyPasswordError}
              errorStyle={{ textAlign: 'center' }}
            />
            { this.props.auth.inProgress ?
              <CircularProgress
                className="reset-btn"
                color={red500}
                size={30}
              /> :
              <RaisedButton
                label="Submit"
                className="reset-btn"
                backgroundColor={red500}
                labelColor="#FFF"
                type="submit"
                disabled={!passwordLength}
              />
            }
          </div>
          {passwordResetError}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, authActions)(PasswordReset);
