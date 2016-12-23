import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import './Form.scss';

const Form = props => (
  <form className={props.className} onSubmit={props.onSubmit}>
    <Paper className={`form ${props.paperStyle}`} zDepth={1}>
      {props.children}
    </Paper>
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  paperStyle: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Form;
