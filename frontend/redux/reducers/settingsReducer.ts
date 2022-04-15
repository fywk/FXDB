import { getLocalStore } from "next-persist";

import * as types from "../constants/actionTypes";

const initialState = {
  displayMode: "grid",
};

const persistedState = getLocalStore("settings", initialState);

const settingsReducer = (state = persistedState, action) => {
  let displayMode: string;

  switch (action.type) {
    case types.UPDATE_DISPLAY_MODE:
      displayMode = action.payload;
      return {
        ...state,
        displayMode,
      };
    default:
      return state;
  }
};

export default settingsReducer;
