import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import './auth.scss';

const SuccessMessage = props => (
  <Paper className="auth-container__success-container" zDepth={2}>
    <h2 className="auth-container__success-header">
      {props.message}
    </h2>
    {props.link ?
      <Link className="auth-container__success-link" to={props.link}>Login</Link> : null}
  </Paper>
);

SuccessMessage.propTypes = {
  message: PropTypes.string,
  link: PropTypes.string,
};

export default SuccessMessage;
