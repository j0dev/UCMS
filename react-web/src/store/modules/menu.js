import { createAction, handleActions } from "redux-actions";

//================================================

const CHANGE_MENU = "menu/CHANGE_MENU";
const INIT_MENU = "menu/INIT_MENU";
const CHANGE_ACTIVE = "menu/CHANGE_ACTIVE";

//================================================

// 액션
export const chagneMenu = createAction(CHANGE_MENU);
export const initMenu = createAction(INIT_MENU);
export const changeActive = createAction(CHANGE_ACTIVE, (navActive) => ({
  navActive,
}));

//================================================

//================================================

// 초기화

export const initialState = {
  isClose: true,
  active: "home",
};
//================================================

const menu = handleActions(
  {
    [CHANGE_MENU]: (state) => ({
      ...state,
      isClose: !state.isClose,
    }),
    [INIT_MENU]: (state) => ({
      ...state,
      isClose: true,
    }),
    [CHANGE_ACTIVE]: (state, { payload: navActive }) => ({
      ...state,
      active: navActive,
    }),
  },
  initialState
);

export default menu;
