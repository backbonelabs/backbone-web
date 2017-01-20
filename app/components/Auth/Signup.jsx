import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { red500, grey900 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Logo from '../../images/logo.png';
import Form from '../common/Form/Form';
import constants from '../../utils/constants';

import * as actions from '../../actions/auth';
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
      passwordWarning = validPassword ? '' : 'Password must be at least 8 characters';
    }

    return (
      <div className="auth-container">
        <div className="auth-container__header">
          <h2>Sign Up</h2>
          <div className="auth-container__logo">
            <img src={Logo} role="presentation" />
          </div>
        </div>
        <Form onSubmit={this.handleOnSubmit}>
          <div className="auth-container__textfield-container">
            <TextField
              className="auth-container__textfield"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineFocusStyle={{ borderColor: grey900 }}
              floatingLabelText="Email"
              onChange={this.onEmailChange}
              errorText={auth.signupError.message || emailWarning}
              errorStyle={{ textAlign: 'center' }}
            />
            <TextField
              className="auth-container__textfield"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineFocusStyle={{ borderColor: grey900 }}
              floatingLabelText="Password"
              type="password"
              onChange={this.onPasswordChange}
              errorText={passwordWarning}
              errorStyle={{ textAlign: 'center' }}
            />
            <TextField
              className="auth-container__textfield"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineFocusStyle={{ borderColor: grey900 }}
              floatingLabelText="Confirm Password"
              type="password"
              onChange={this.onConfirmPasswordChange}
              errorText={confirmPasswordError}
              errorStyle={{ textAlign: 'center' }}
            />
            { this.props.auth.inProgress ?
              <CircularProgress
                className="auth-container__cta"
                color={red500}
                size={30}
              /> :
              <RaisedButton
                label="Sign up"
                className="auth-container__cta"
                backgroundColor={red500}
                labelColor="#FFF"
                type="submit"
                disabled={
                  ((!email || !validEmail) ||
                  (!password || !validPassword) ||
                  (!confirmPassword))
                }
              />
            }
            <div className="auth-container__footer">
              <p>
                Already signed up?&nbsp;
                <Link to="/login" className="auth-container__footer-primary-link">Log In</Link>
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

export default connect(mapStateToProps, actions)(Signup);

