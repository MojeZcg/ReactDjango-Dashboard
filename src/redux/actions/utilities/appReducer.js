import { TOGGLE_DARKMODE, CHANGE_LANGUAGE } from "./types";

const initialState = {
  darkmode: false,
  currentLanguage: "es",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, darkmode: !state.darkmode };
    case CHANGE_LANGUAGE:
      return { ...state, currentLanguage: action.payload };
    default:
      return state;
  }
};

export default appReducer;
