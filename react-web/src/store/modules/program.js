import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as porgramApi from "../../lib/api/program";

//================================================

const CHANGE_INPUTS = "program/CHANGE_INPUTS";
const CHANGE_UPDATE_INPUTS = "program/CHANGE_UPDATE_INPUTS";

const [
  GET_INSTALL_LIST,
  GET_INSTALL_LIST_SUCCESS,
  GET_INSTALL_LIST_FAILURE
] = createRequestActionTypes("program/GET_INSTALL_LIST");

const [
  IHNSERT_INSTALL_LIST,
  IHNSERT_INSTALL_LIST_SUCCESS,
  IHNSERT_INSTALL_LIST_FAILURE
] = createRequestActionTypes("program/IHNSERT_INSTALL_LIST");

const [
  UPDATE_INSTALL_LIST,
  UPDATE_INSTALL_LIST_SUCCESS,
  UPDATE_INSTALL_LIST_FAILURE
] = createRequestActionTypes("program/UPDATE_INSTALL_LIST");

const [
  DELETE_INSTALL_LIST,
  DELETE_INSTALL_LIST_SUCCESS,
  DELETE_INSTALL_LIST_FAILURE
] = createRequestActionTypes("program/DELETE_INSTALL_LIST");

const INITIALIZE_UPDATE_INPUTS = "program/INITIALIZE__UPDATE_INPUTS";
// const [
//   GET_COMPUTER_LIST,
//   GET_COMPUTER_LIST_SUCCESS,
//   GET_COMPUTER_LIST_FAILURE
// ] = createRequestActionTypes("computer/GET_COMPUTER_LIST");

//================================================

// 액션
export const changeInputs = createAction(CHANGE_INPUTS, ({ key, value }) => ({
  key, // username, password, passwordConfirm
  value // 실제 바꾸려는 값
}));

export const changeUpdateInputs = createAction(
  CHANGE_UPDATE_INPUTS,
  ({ key, value }) => ({
    key,
    value
  })
);
export const initalizeUpdateInputs = createAction(
  INITIALIZE_UPDATE_INPUTS,
  ({ _id, value }) => ({
    _id,
    value
  })
);

export const getInstallList = createAction(GET_INSTALL_LIST);
export const insertInstallList = createAction(IHNSERT_INSTALL_LIST, name => ({
  name
}));
export const updateInstallList = createAction(
  UPDATE_INSTALL_LIST,
  ({ _id, name }) => ({
    _id,
    name
  })
);
export const deleteInstallList = createAction(DELETE_INSTALL_LIST, _id => ({
  _id
}));

//================================================

// saga 생성

const getInstallListSaga = createRequestSaga(
  GET_INSTALL_LIST,
  porgramApi.getInstallList
);

const insertInstallListSaga = createRequestSaga(
  IHNSERT_INSTALL_LIST,
  porgramApi.insertInstallList
);
const updateInstallListSaga = createRequestSaga(
  UPDATE_INSTALL_LIST,
  porgramApi.updateInstallList
);
const deleteInstallListSaga = createRequestSaga(
  DELETE_INSTALL_LIST,
  porgramApi.deleteInstallList
);

export function* programSaga() {
  yield takeLatest(GET_INSTALL_LIST, getInstallListSaga);
  yield takeLatest(IHNSERT_INSTALL_LIST, insertInstallListSaga);
  yield takeLatest(UPDATE_INSTALL_LIST, updateInstallListSaga);
  yield takeLatest(DELETE_INSTALL_LIST, deleteInstallListSaga);
}

//================================================

// 초기화
export const initialState = {
  inputs: {
    name: ""
  },
  updateInputs: {
    _id: "",
    name: ""
  },
  installList: null,
  error: {
    type: null,
    description: null
  }
};
//================================================
export default handleActions(
  {
    [INITIALIZE_UPDATE_INPUTS]: (state, { payload: { _id, value } }) => ({
      ...state,
      updateInputs: { _id: _id, name: value }
    }),
    [CHANGE_INPUTS]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft["inputs"][key] = value;
      }),
    [CHANGE_UPDATE_INPUTS]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft["updateInputs"][key] = value;
      }),
    [GET_INSTALL_LIST_SUCCESS]: (state, { payload: installList }) => ({
      ...state,
      error: initialState.error,
      installList: installList
    }),
    [GET_INSTALL_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "getInstallList", description: error },
      installList: initialState.installList
    }),
    [IHNSERT_INSTALL_LIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      installList: state.installList.concat(data)
    }),
    [IHNSERT_INSTALL_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "insertInstallList", description: error },
      installList: initialState.installList
    }),
    [UPDATE_INSTALL_LIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      installList: state.installList.map(item =>
        item._id === data._id ? { ...item, ...data } : item
      )
    }),
    [UPDATE_INSTALL_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "updateInstallList", description: error }
    }),
    [DELETE_INSTALL_LIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      installList: state.installList.filter(item => item._id !== data)
    }),
    [DELETE_INSTALL_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "deleteInstallList", description: error }
    })
  },
  initialState
);
