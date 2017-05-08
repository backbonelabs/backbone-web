import React, { Component, PropTypes } from "react";
import Sidebar from "react-sidebar";
import { NavLink } from "react-router-dom";
import Button from "muicss/lib/react/button";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import AppRoutes from "./AppRoutes";

import BackboneLogo from "../images/backbone-logo.svg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  render() {
    const sidebarContent = (
      <ul>
        <li>
          <NavLink to="/" onClick={this.onSetSidebarOpen}>
            <img src={BackboneLogo} alt="Backbone logo" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/business"
            activeClassName="side-bar-active"
            onClick={this.onSetSidebarOpen}
          >
            <Button color="danger">
              Business
            </Button>
          </NavLink>
        </li>
        <li>
          <a href="https://support.gobackbone.com">
            <Button color="danger" onClick={this.onSetSidebarOpen}>
              Support
            </Button>
          </a>
        </li>
        <li>
          <NavLink
            to="/pre-order"
            activeClassName="side-bar-active"
            onClick={this.onSetSidebarOpen}
          >
            <Button color="danger">Pre-order</Button>
          </NavLink>
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
          <main id="main-wrapper">
            <AppRoutes />
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
    routes: PropTypes.array
  })
};

export default App;
