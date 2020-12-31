import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as computerApi from "../../lib/api/computer";
import * as userApi from "../../lib/api/user";

//================================================

const [
  GET_CLASSROOM_DETAIL,
  GET_CLASSROOM_DETAIL_SUCCESS,
  GET_CLASSROOM_DETAIL_FAILURE
] = createRequestActionTypes("home/GET_CLASSROOM");

const [
  GET_INSTALL_CHECK,
  GET_INSTALL_CHECK_SUCCESS,
  GET_INSTALL_CHECK_FAILRUE
] = createRequestActionTypes("home/GET_INSTALL_CHECK");

const [
  GET_ACTIVE_USERS,
  GET_ACTIVE_USERS_SUCCESS,
  GET_ACTIVE_USERS_FAILURE
] = createRequestActionTypes("home/GET_ACTIVE_USERS");

const [
  GET_NOTACTIVE_USERS,
  GET_NOTACTIVE_USERS_SUCCESS,
  GET_NOTACTIVE_USERS_FAILURE
] = createRequestActionTypes("home/GET_NOTACTIVE_USERS");

const [
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
] = createRequestActionTypes("home/DELETE_USER");

const [
  ACTIVE_USER,
  ACTIVE_USER_SUCCESS,
  ACTIVE_USER_FAILURE
] = createRequestActionTypes("home/ACTIVE_USER");

// const [
//   GET_COMPUTER_LIST,
//   GET_COMPUTER_LIST_SUCCESS,
//   GET_COMPUTER_LIST_FAILURE
// ] = createRequestActionTypes("computer/GET_COMPUTER_LIST");

//================================================

// 액션

export const getActiveUser = createAction(GET_ACTIVE_USERS);
export const getNotActiveUser = createAction(GET_NOTACTIVE_USERS);
export const deleteUser = createAction(DELETE_USER, _id => ({
  _id
}));
export const activeUser = createAction(ACTIVE_USER, _id => ({
  _id
}));

export const getClassroomDetail = createAction(GET_CLASSROOM_DETAIL, _id => ({
  _id
}));

export const getInstallCheck = createAction(GET_INSTALL_CHECK);

//================================================

// saga 생성

const getClassroomSaga = createRequestSaga(
  GET_CLASSROOM_DETAIL,
  computerApi.getClassroom
);

const getInstallCheckSaga = createRequestSaga(
  GET_INSTALL_CHECK,
  computerApi.getInstallCheck
);

const getActiveUserSaga = createRequestSaga(
  GET_ACTIVE_USERS,
  userApi.getActiveUser
);
const getNotActiveUserSaga = createRequestSaga(
  GET_NOTACTIVE_USERS,
  userApi.getNotActiveUser
);
const deleteUserSaga = createRequestSaga(DELETE_USER, userApi.deleteUser);
const activeUserSaga = createRequestSaga(ACTIVE_USER, userApi.updateUser);

export function* homeSaga() {
  yield takeLatest(GET_CLASSROOM_DETAIL, getClassroomSaga);
  yield takeLatest(GET_INSTALL_CHECK, getInstallCheckSaga);
  yield takeLatest(GET_ACTIVE_USERS, getActiveUserSaga);
  yield takeLatest(GET_NOTACTIVE_USERS, getNotActiveUserSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(ACTIVE_USER, activeUserSaga);
}

//================================================

// 초기화
export const initialState = {
  detail: null,
  error: {
    type: null,
    description: null
  },
  install: null,
  activeUsers: null,
  notActiveUsers: null
};
//================================================
export default handleActions(
  {
    [GET_CLASSROOM_DETAIL_SUCCESS]: (state, { payload: classroom }) => ({
      ...state,
      error: initialState.error,
      detail: classroom
    }),
    [GET_CLASSROOM_DETAIL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "getClassroom", description: error },
      detail: initialState.detail
    }),
    [GET_INSTALL_CHECK_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      error: initialState.error,
      install: result
    }),
    [GET_INSTALL_CHECK_FAILRUE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "getInstallCheck", description: error },
      install: initialState.install
    }),

    [GET_ACTIVE_USERS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      activeUsers: data
    }),

    [GET_ACTIVE_USERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "getActiveUser", description: error },
      activeUsers: initialState.activeUsers
    }),

    [GET_NOTACTIVE_USERS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      notActiveUsers: data
    }),

    [GET_NOTACTIVE_USERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "getNotActiveUser", description: error },
      notActiveUsers: initialState.notActiveUsers
    })
  },
  initialState
);
