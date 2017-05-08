import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { fetchUser } from "./actions/user";
import store from "./store";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import App from "./components/App.jsx";

import "./global.css";
import "normalize.css";

// Check if there is a token
const token = localStorage.getItem("sessionId");
if (token !== null) {
  store.dispatch(fetchUser());
}
// set all headers
setAuthorizationToken(token);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
