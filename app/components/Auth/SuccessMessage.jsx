import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';

const SuccessMessage = props => (
  <Paper style={{ padding: 25 }} zDepth={2}>
    <h2 style={{ textAlign: 'center' }}>
      {props.message}
      {props.link ? <Link to={props.link}>Login</Link> : null}
    </h2>
  </Paper>
);

SuccessMessage.propTypes = {
  message: PropTypes.string,
  link: PropTypes.string,
};

export default SuccessMessage;
