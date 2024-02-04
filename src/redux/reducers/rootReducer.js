import { combineReducers } from "redux";
import categories from "./categories";
import blog from "./blog";
import appReducer from "../actions/utilities/appReducer";

const rootReducer = combineReducers({
  appReducer,
  categories,
  blog,
});

export default rootReducer;
