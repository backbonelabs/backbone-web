import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';

import './auth.scss';

const SuccessMessage = props => (
  <Container>
    <Panel className="mui--text-center auth-container__success">
      <h2>
        {props.message}
      </h2>
      {props.link ?
        <Link to={`/${props.link}`}>
          <Button
            variant="raised"
            color="primary"
          >
            {props.link}
          </Button>
        </Link> : null
      }
    </Panel>
  </Container>
);

SuccessMessage.propTypes = {
  message: PropTypes.string,
  link: PropTypes.string,
};

export default SuccessMessage;
