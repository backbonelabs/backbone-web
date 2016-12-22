import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import logo from '../../../public/images/Logo.png';
import './Form.scss';

const materialPrimaryColor = '#F44336';

const Form = props => (
  <form className={props.className} onSubmit={props.onSubmit}>
    <Paper className="Form" zDepth={1}>
      <div className="logo-container">
        <img src={logo} role="presentation" className="Form-logo" />
      </div>
      <div className="Form-header">
        <h2 style={{ textAlign: 'center' }}>{props.login ? 'Login' : 'Sign Up'}</h2>
      </div>
      <div className="Form-textfield-container">
        <TextField
          className="Form-textfield"
          floatingLabelFocusStyle={{ color: materialPrimaryColor }}
          underlineFocusStyle={{ borderColor: materialPrimaryColor }}
          floatingLabelText="Email"
          name="email"
          onChange={props.onChange}
        />
        <TextField
          className="Form-textfield"
          floatingLabelFocusStyle={{ color: materialPrimaryColor }}
          underlineFocusStyle={{ borderColor: materialPrimaryColor }}
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={props.onChange}
        />
        {
          props.signup ?
            <TextField
              className="Form-textfield"
              floatingLabelFocusStyle={{ color: materialPrimaryColor }}
              underlineFocusStyle={{ borderColor: materialPrimaryColor }}
              floatingLabelText="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={props.onChange}
            /> : null
        }
        <RaisedButton
          label={props.login ? 'Login' : 'Sign up'}
          className="FormBtn"
          backgroundColor={materialPrimaryColor}
          labelColor="#FFF"
          type="submit"
        />
        {
          props.login ?
            <div>
              <p>Don't have an account?
                <span
                  onClick={props.toggleSignup}
                  style={{ color: materialPrimaryColor, cursor: 'pointer' }}
                > Sign up</span>
              </p>
              <Link to="passwordreset" style={{ textDecoration: 'none', color: '#212121' }}>
                <p className="forgotPassword"><small>Forgot Your Password?</small></p>
              </Link>
            </div>
          : <p>Already signed up?
              <span
                onClick={props.toggleSignup}
                style={{ color: materialPrimaryColor, cursor: 'pointer' }}
              > Log In</span>
          </p>
        }
      </div>
    </Paper>
  </form>
);

Form.propTypes = {
  login: PropTypes.bool,
  signup: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  toggleSignup: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Form;
