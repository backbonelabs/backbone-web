import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { red500, grey900 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth';

import Logo from '../../images/logo.png';
import Form from '../common/Form/Form';
import constants from '../../utils/constants';

import './auth.scss';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    clearErrors: PropTypes.func,
    auth: PropTypes.shape({
      loginError: PropTypes.object,
      inProgress: PropTypes.bool,
      loginRedirectUrl: PropTypes.string,
    }),
  }

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validEmail: false,
      emailPristine: true,
      passwordPristine: true,
    };
  }

  componentWillMount() {
    // clear any error in the reducer,
    // Prevents Errors staying in the form, when a user navigates away from the form and back
    this.props.clearErrors();
  }

  @autobind
  onEmailChange(evt) {
    const stateChanges = {
      validEmail: constants.emailRegex.test(evt.target.value.trim()),
      email: evt.target.value,
    };

    if (this.state.emailPristine) {
      stateChanges.emailPristine = false;
    }

    this.setState(stateChanges);
  }

  @autobind
  onPasswordChange(evt) {
    if (this.state.passwordPristine) {
      return this.setState({
        passwordPristine: false,
        password: evt.target.value,
      });
    }

    return this.setState({ password: evt.target.value });
  }

  @autobind
  handleOnSubmit(evt) {
    evt.preventDefault();
    const { email, password } = this.state;
    const { loginRedirectUrl } = this.props.auth;
    this.props.login({ email: email.trim(), password }, loginRedirectUrl);
  }

  render() {
    const { auth } = this.props;
    const { email, password, validEmail, emailPristine, passwordPristine } = this.state;
    const validPassword = password.length >= 8;
    let emailWarning;
    let passwordWarning;
    if (!emailPristine) {
      emailWarning = validEmail ? null : 'Please enter a valid email address';
    }
    if (!passwordPristine) {
      passwordWarning = validPassword ? '' : 'Password must be at least 8 characters';
    }

    return (
      <div className="auth-container">
        { (auth.loginRedirectUrl !== '/') ?
          <h1 className="auth-container__continue-header">Please log in to continue.</h1> : null }
        <div className="auth-container__header">
          <h2>Login</h2>
          <div className="auth-container__logo">
            <img src={Logo} role="presentation" />
          </div>
        </div>
        <Form onSubmit={this.handleOnSubmit} className="auth-container__form">
          <div className="auth-container__textfield-container">
            <TextField
              className="auth-container__textfield"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineFocusStyle={{ borderColor: grey900 }}
              floatingLabelText="Email"
              onChange={this.onEmailChange}
              errorText={emailWarning}
              errorStyle={{ textAlign: 'center' }}
            />
            <TextField
              className="auth-container__textfield"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineFocusStyle={{ borderColor: grey900 }}
              floatingLabelText="Password"
              type="password"
              onChange={this.onPasswordChange}
              errorText={auth.loginError.message || passwordWarning}
              errorStyle={{ textAlign: 'center' }}
            />
            { this.props.auth.inProgress ?
              <CircularProgress
                className="auth-container__cta"
                color={red500}
                size={30}
              /> :
              <RaisedButton
                label="Login"
                className="auth-container__cta"
                backgroundColor={red500}
                labelColor="#FFF"
                type="submit"
                disabled={(!email || !validEmail) || (!password || !validPassword)}
              />
            }
            <div className="auth-container__footer">
              <p>Don't have an account?&nbsp;
                <Link to="/signup" className="auth-container__footer-primary-link">Sign Up</Link>
              </p>
              <p>
                <Link
                  to="/request-reset"
                  className="auth-container__footer-secondary-link secondary-text"
                >
                  Forgot Your Password?
                </Link>
              </p>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, actions)(Login);

