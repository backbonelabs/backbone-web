import React, { PropTypes } from 'react';
// import Navbar from './Navbar/Navbar';

const App = (props) => {
  const currentRoute = props.router.routes[props.router.routes.length - 1];
  if (currentRoute.title) {
    document.title = `${currentRoute.title} - Backbone`;
  } else {
    document.title = 'Backbone';
  }

  return (
    <div>
      {/* <nav>
        <Navbar />
      </nav> */}
      <main>
        {props.children}
      </main>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
  router: PropTypes.shape({
    routes: PropTypes.array,
  }),
};

export default App;
