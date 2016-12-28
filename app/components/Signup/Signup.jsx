import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { red500, grey900 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Logo from '../../public/images/Logo.png';
import Form from '../common/Form/Form';
import constants from '../../utils/constants';

import * as actions from '../../actions/auth';
import './Signup.scss';

class Signup extends Component {
  static propTypes = {
    signup: PropTypes.func,
    clearErrors: PropTypes.func,
    auth: PropTypes.shape({
      signupError: PropTypes.string,
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

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillMount() {
    // clear any error in the reducer,
    // Prevents Errors staying in the form, when a user navigates away from the form and back
    this.props.clearErrors();
  }

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

  onPasswordChange(evt) {
    if (this.state.passwordPristine) {
      return this.setState({
        passwordPristine: false,
        password: evt.target.value,
      });
    }

    return this.setState({ password: evt.target.value });
  }

  onConfirmPasswordChange(evt) {
    this.setState({ confirmPassword: evt.target.value });
  }

  handleOnSubmit(evt) {
    evt.preventDefault();
    const { email, password, confirmPassword } = this.state;
    const lowerCaseEmail = email.toLowerCase().trim();

    if (password === confirmPassword) {
      return this.props.signup({ email: lowerCaseEmail, password });
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
      <div className="signup-container">
        <Form onSubmit={this.handleOnSubmit}>
          <div className="signup-logo-container">
            <img src={Logo} role="presentation" />
          </div>
          <div className="signup-header">
            <h2>Sign Up</h2>
          </div>
          <div className="signup-textfield-container">
            <TextField
              className="signup-textfield"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineFocusStyle={{ borderColor: grey900 }}
              floatingLabelText="Email"
              onChange={this.onEmailChange}
              errorText={auth.signupError || emailWarning}
              errorStyle={{ textAlign: 'center' }}
            />
            <TextField
              className="signup-textfield"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineFocusStyle={{ borderColor: grey900 }}
              floatingLabelText="Password"
              type="password"
              onChange={this.onPasswordChange}
              errorText={passwordWarning}
              errorStyle={{ textAlign: 'center' }}
            />
            <TextField
              className="signup-textfield"
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
                className="signup-btn"
                color={red500}
                size={30}
              /> :
              <RaisedButton
                label="Sign up"
                className="signup-btn"
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
            <p>Already signed up?
              <Link to="/login" className="signup-link"> Log In</Link>
            </p>
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

