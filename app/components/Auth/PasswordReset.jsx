import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import Form from 'muicss/lib/react/form';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';
import Logo from '../../images/logo.png';
import * as authActions from '../../actions/auth';
import SuccessMessage from './SuccessMessage';
import TextField from '../common/Form/TextField';
import { red500 } from '../../utils/colorCodes';

import './auth.scss';

class PasswordReset extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      inProgress: PropTypes.bool,
      passwordResetError: PropTypes.object,
      passwordResetSent: PropTypes.bool,
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
          <p className="mui--text-danger">
            Invalid reset token. Please contact <a href="mailto:support@gobackbone.com">
            support@gobackbone.com</a> for assistance.
          </p>
        );
      }
    }

    return (
      <Container className="auth-container">
        { this.props.auth.passwordResetSent ?
          <SuccessMessage
            message="Your password has been successfully reset!"
          /> :
          <Panel className="auth-container__panel">
            <div className="auth-container__header">
              <h1>Password Reset</h1>
              <div className="auth-container__logo">
                <img src={Logo} role="presentation" />
              </div>
            </div>
            <Form className="auth-container__form" onSubmit={this.handleOnSubmit}>
              <h4>Enter your new password in the fields below.</h4>
              <div className="auth-container__input">
                <TextField
                  type="password"
                  label="New password"
                  floatingLabel
                  name="newPassword"
                  value={newPassword}
                  onChange={this.handleOnChange}
                  errorText={passwordError}
                />
              </div>
              <div className="auth-container__input">
                <TextField
                  type="password"
                  label="Verify password"
                  floatingLabel
                  name="verifyPassword"
                  value={verifyPassword}
                  onChange={this.handleOnChange}
                  errorText={verifyPasswordError}
                />
              </div>
              <div className="auth-container__cta">
                { this.props.auth.inProgress ?
                  <MDSpinner singleColor={red500} /> :
                  <Button
                    variant="raised"
                    color="danger"
                    type="submit"
                    disabled={!passwordLength}
                  >
                    Submit
                  </Button>
                }
              </div>
            </Form>
            <div className="auth-container__footer">
              {passwordResetError}
            </div>
          </Panel>
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, authActions)(PasswordReset);
