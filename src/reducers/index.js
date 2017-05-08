import { combineReducers } from "redux";
import { responsiveStateReducer } from "redux-responsive";
import { routerReducer } from "react-router-redux";
import auth from "./auth";

const rootReducer = combineReducers({
  auth,
  browser: responsiveStateReducer,
  router: routerReducer
});

export default rootReducer;
