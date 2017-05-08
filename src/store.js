import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { asyncActionMiddleware } from "redux-async-action";
import { responsiveStoreEnhancer } from "redux-responsive";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import reducers from "./reducers";

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const routerMW = routerMiddleware(history);

export const store = createStore(
  reducers,
  compose(
    responsiveStoreEnhancer,
    applyMiddleware(asyncActionMiddleware, ReduxThunk, routerMW)
  )
);
