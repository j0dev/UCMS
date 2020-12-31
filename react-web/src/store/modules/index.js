import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import building, { buildingSaga } from "./building";
import classroom, { classroomSaga } from "./classroom";
import classR, { classSaga } from "./classR";
import computer, { computerSaga } from "./computer";
import home, { homeSaga } from "./home";
import program, { programSaga } from "./program";
import userManage, { userManageSaga } from "./userManage";
import token, { tokenSaga } from "./token";
import menu from "./menu";

const rootReducer = combineReducers({
  token,
  loading,
  auth,
  user,
  building,
  classroom,
  classR,
  computer,
  home,
  menu,
  userManage,
  program
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    buildingSaga(),
    tokenSaga(),
    classroomSaga(),
    classSaga(),
    computerSaga(),
    homeSaga(),
    programSaga(),
    userManageSaga()
  ]);
}

export default rootReducer;
