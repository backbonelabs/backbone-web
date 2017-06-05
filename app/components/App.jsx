import React, { Component, PropTypes } from 'react';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router';
import Button from 'muicss/lib/react/button';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

import BackboneLogo from '../images/backbone-logo.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  render() {
    const currentRoute = this.props.router.routes[
      this.props.router.routes.length - 1
    ];
    if (currentRoute.title) {
      document.title = `${currentRoute.title} - Backbone`;
    } else {
      document.title = 'Backbone';
    }
    const sidebarContent = (
      <ul>
        <li>
          <Link to="/" onClick={this.onSetSidebarOpen}>
            <img src={BackboneLogo} alt="Backbone logo" />
          </Link>
        </li>
        <li>
          <Link
            to="/business"
            activeClassName="side-bar-active"
            onClick={this.onSetSidebarOpen}
          >
            <Button color="danger">
              Business
            </Button>
          </Link>
        </li>
        <li>
          <a href="https://support.gobackbone.com">
            <Button color="danger" onClick={this.onSetSidebarOpen}>
              Support
            </Button>
          </a>
        </li>
        <li>
          <a
            href="https://shop.gobackbone.com/products/backbone-the-worlds-smartest-posture-support"
          >
            <Button color="danger">Pre-order</Button>
          </a>
        </li>
      </ul>
    );

    return (
      <div className="app">
        <Sidebar
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          sidebarClassName="side-nav-content"
          rootClassName="side-nav-root"
        >
          <Navbar openSideNav={this.onSetSidebarOpen} />
          <main>
            {this.props.children}
          </main>
          <Footer />
        </Sidebar>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  router: PropTypes.shape({
    routes: PropTypes.array,
  }),
};

export default App;
