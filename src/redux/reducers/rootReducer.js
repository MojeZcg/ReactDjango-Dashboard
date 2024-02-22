import { combineReducers } from "redux";
import categories from "./categories";
import blog from "./blog";
import auth from "./auth";
import appReducer from "../actions/utilities/appReducer";

const rootReducer = combineReducers({
  appReducer,
  categories,
  blog,
  auth,
});

export default rootReducer;
