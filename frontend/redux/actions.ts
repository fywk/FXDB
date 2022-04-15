import * as types from "./constants/actionTypes";

type Actions = {
  [key: string]: any;
};

const actions = <Actions>{};

actions.updateDisplayMode = (newDisplayMode) => ({
  type: types.UPDATE_DISPLAY_MODE,
  payload: newDisplayMode,
});

export default actions;
