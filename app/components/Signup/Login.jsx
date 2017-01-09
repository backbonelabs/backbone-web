import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { red500, grey900 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth';

import Logo from '../../public/images/Logo.png';
import Form from '../common/Form/Form';
import constants from '../../utils/constants';

import './Signup.scss';

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
      <div className="signup-container">
        { (auth.loginRedirectUrl !== '/') ?
          <h1 className="continue-header">Please log in to continue.</h1> : null }
        <Form onSubmit={this.handleOnSubmit}>
          <div className="signup-logo-container">
            <img src={Logo} role="presentation" />
          </div>
          <div className="signup-header">
            <h2>Login</h2>
          </div>
          <div className="signup-textfield-container">
            <TextField
              className="signup-textfield"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineFocusStyle={{ borderColor: grey900 }}
              floatingLabelText="Email"
              onChange={this.onEmailChange}
              errorText={emailWarning}
              errorStyle={{ textAlign: 'center' }}
            />
            <TextField
              className="signup-textfield"
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
                className="signup-btn"
                color={red500}
                size={30}
              /> :
              <RaisedButton
                label="Login"
                className="signup-btn"
                backgroundColor={red500}
                labelColor="#FFF"
                type="submit"
                disabled={(!email || !validEmail) || (!password || !validPassword)}
              />
            }
            <div>
              <p>Don't have an account?
                <Link to="/signup" className="signup-link"> Sign Up</Link>
              </p>
              <Link to="/password-reset" className="forgot-password">
                <p>Forgot Your Password?</p>
              </Link>
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

