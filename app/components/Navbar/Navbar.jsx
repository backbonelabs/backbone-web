import React, { PropTypes } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

import './Navbar.scss';

const Navbar = (props) => {
  let loginBtn;

  if (props.auth.user._id) {
    loginBtn = (
      <FlatButton onClick={props.logOut} label="Log Out" hoverColor="#F44336" />
    );
  } else {
    loginBtn = (
      <Link to="/signup">
        <FlatButton label="sign up" hoverColor="#F44336" />
      </Link>
    );
  }

  return (
    <Toolbar className="navBar">
      <ToolbarGroup />
      <ToolbarGroup>
        <div>
          <Link to="/">
            <FlatButton label="Home" hoverColor="#F44336" />
          </Link>
          {loginBtn}
        </div>
      </ToolbarGroup>
    </Toolbar>
  );
};

Navbar.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object,
  }),
  logOut: PropTypes.func,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, actions)(Navbar);
