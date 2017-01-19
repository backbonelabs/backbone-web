import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { red500, grey900 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Form from '../common/Form/Form';
import Logo from '../../public/images/Logo.png';
import * as authActions from '../../actions/auth';
import constants from '../../utils/constants';
import SuccessMessage from './SuccessMessage';

class RequestReset extends Component {
  static propTypes = {
    requestReset: PropTypes.func,
    auth: PropTypes.shape({
      inProgress: PropTypes.bool,
      requestResetError: PropTypes.object,
      requestSent: PropTypes.bool,
    }),
  }

  constructor() {
    super();

    this.state = {
      email: '',
      validEmail: false,
    };
  }

  @autobind
  handleOnChange(evt) {
    const stateChanges = {
      validEmail: constants.emailRegex.test(evt.target.value.trim()),
      email: evt.target.value,
    };
    this.setState(stateChanges);
  }

  @autobind
  handleOnSubmit(evt) {
    evt.preventDefault();
    const { email } = this.state;
    this.props.requestReset({ email: email.trim() });
  }

  render() {
    return (
      <div className="auth-container">
        {
        this.props.auth.requestSent ?
          <SuccessMessage
            message="Instructions on how to reset your password have been emailed to you."
          />
        :
          <div>
            <div className="auth-container__header">
              <h2>Forgot your password?</h2>
              <div className="auth-container__logo">
                <img src={Logo} role="presentation" />
              </div>
            </div>
            <Form onSubmit={this.handleOnSubmit}>
              <div className="auth-container__textfield-container">
                <p>
                  Enter your email address below to receive instructions
                  on how to change your password.
                </p>
                <TextField
                  className="auth-container__textfield"
                  floatingLabelFocusStyle={{ color: grey900 }}
                  underlineFocusStyle={{ borderColor: grey900 }}
                  floatingLabelText="Email"
                  name="email"
                  onChange={this.handleOnChange}
                  errorText={this.props.auth.requestResetError.message}
                  errorStyle={{ textAlign: 'center' }}
                />
                { this.props.auth.inProgress ?
                  <CircularProgress
                    className="auth-container__cta"
                    color={red500}
                    size={30}
                  /> :
                  <RaisedButton
                    label="Submit"
                    className="auth-container__cta"
                    backgroundColor={red500}
                    labelColor="#FFF"
                    type="submit"
                    disabled={!this.state.email || !this.state.validEmail}
                  />
                }
              </div>
            </Form>
          </div>
      }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, authActions)(RequestReset);
