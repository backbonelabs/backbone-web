import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Logo from '../../images/logo.png';
import constants from '../../utils/constants';
import * as actions from '../../actions/auth';

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
    let emailError = '';
    let passwordError = '';
    if (!emailPristine) {
      if (validEmail) {
        emailWarning = null;
      } else {
        emailWarning = 'Please enter a valid email address';
        emailError = 'input-error';
      }
    }
    if (!passwordPristine) {
      if (validPassword) {
        passwordWarning = null;
      } else {
        passwordWarning = 'Password must be at least 8 characters';
        passwordError = 'input-error';
      }
    }

    return (
      <Container className="auth-container">
        { (auth.loginRedirectUrl !== '/') ?
          <h1>Please log in to continue.</h1> : null }
        <Panel className="auth-container__panel">
          <div className="auth-container__header">
            <h1>Login</h1>
            <div className="auth-container__logo">
              <img src={Logo} role="presentation" />
            </div>
          </div>
          <Form className="auth-container__form" onSubmit={this.handleOnSubmit}>
            <div className="auth-container__input">
              <Input
                className={emailError}
                label="Email"
                floatingLabel
                value={email}
                onChange={this.onEmailChange}
              />
              <small>{emailWarning}</small>
            </div>
            <div className="auth-container__input">
              <Input
                className={passwordError}
                type="password"
                label="Password"
                floatingLabel
                value={password}
                onChange={this.onPasswordChange}
              />
              <small>{passwordWarning}</small>
            </div>
            <div className="auth-container__cta">
              <Button
                variant="raised"
                color="danger"
                type="submit"
                disabled={(!email || !validEmail) || (!password || !validPassword)}
              >
                Login
              </Button>
            </div>
          </Form>
          <div className="auth-container__footer mui--text-center">
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
        </Panel>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, actions)(Login);
