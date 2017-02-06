import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import Form from 'muicss/lib/react/form';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import MDSpinner from 'react-md-spinner';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Logo from '../../images/logo.png';
import constants from '../../utils/constants';
import * as authActions from '../../actions/auth';
import TextField from '../common/TextField/TextField';

import './auth.scss';

class Signup extends Component {
  static propTypes = {
    signup: PropTypes.func,
    clearErrors: PropTypes.func,
    auth: PropTypes.shape({
      signupError: PropTypes.object,
      inProgress: PropTypes.bool,
    }),
  }

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmPasswordError: '',
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
  onConfirmPasswordChange(evt) {
    this.setState({ confirmPassword: evt.target.value });
  }

  @autobind
  handleOnSubmit(evt) {
    evt.preventDefault();
    const { email, password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      return this.props.signup({ email: email.trim(), password });
    }
    console.log(this.state);
    this.setState({ confirmPasswordError: 'Password and Confirm Password do not match' });
  }

  render() {
    const {
      email,
      password,
      confirmPassword,
      validEmail,
      emailPristine,
      passwordPristine,
      confirmPasswordError,
    } = this.state;
    const { auth } = this.props;
    const validPassword = password.length >= 8;
    let emailWarning;
    let passwordWarning;
    if (!emailPristine) {
      emailWarning = validEmail ? null : 'Please enter a valid email address';
    }
    if (!passwordPristine) {
      passwordWarning = validPassword ? null : 'Password must be at least 8 characters';
    }
    return (
      <Container className="auth-container">
        <Panel className="auth-container__panel">
          <div className="auth-container__header">
            <h1>Sign Up</h1>
            <div className="auth-container__logo">
              <img src={Logo} role="presentation" />
            </div>
          </div>
          <Form className="auth-container__form" onSubmit={this.handleOnSubmit}>
            <div className="auth-container__input">
              <TextField
                fieldType="input"
                label="Email"
                floatingLabel
                value={email}
                onChange={this.onEmailChange}
                errorText={auth.signupError.message || emailWarning}
              />
            </div>
            <div className="auth-container__input">
              <TextField
                fieldType="input"
                type="password"
                label="Confirm Password"
                floatingLabel
                value={password}
                onChange={this.onPasswordChange}
                errorText={passwordWarning}
              />
            </div>
            <div className="auth-container__input">
              <TextField
                fieldType="input"
                type="password"
                label="Password"
                floatingLabel
                value={confirmPassword}
                onChange={this.onConfirmPasswordChange}
                errorText={confirmPasswordError}
              />
              <small>{confirmPasswordError}</small>
            </div>
            <div className="auth-container__cta">
              { auth.inProgress ?
                <MDSpinner singleColor="#F44336" /> :
                <Button
                  variant="raised"
                  color="danger"
                  type="submit"
                  disabled={
                   ((!email || !validEmail) ||
                   (!password || !validPassword) ||
                   (!confirmPassword))
                 }
                >
                  Sign up
                </Button>
              }
            </div>
          </Form>
          <div className="auth-container__footer">
            <p>
              Already signed up?&nbsp;
              <Link to="/login" className="auth-container__footer-primary-link">Log In</Link>
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

export default connect(mapStateToProps, authActions)(Signup);
