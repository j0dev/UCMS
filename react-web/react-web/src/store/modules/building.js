import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as buildingAPI from "../../lib/api/building";

//================================================
const TEMP_SET_BUILDING = "building/TEMP_SET_BUILDING";
const CHANGE_INPUTS = "buiilding/CHANGE_INPUTS";
const CHANGE_UPDATE_INPUTS = "buiilding/CHANGE_UPDATE_INPUTS";
const INITIALIZE_INPUTS = "building/INITIALIZE_INPUTS";
const INITIALIZE_UPDATE_INPUTS = "building/INITIALIZE__UPDATE_INPUTS";
const INITIALIZE_ERROR = "building/INITIALIZE_ERROR";
const [GET, GET_SUCCESS, GET_FAILURE] = createRequestActionTypes(
  "building/GET"
);
const [INSERT, INSERT_SUCCESS, INSERT_FAILURE] = createRequestActionTypes(
  "building/INSERT"
);
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] = createRequestActionTypes(
  "building/UPDATE"
);
const [DELETE, DELETE_SUCCESS, DELETE_FAILURE] = createRequestActionTypes(
  "building/DELETE"
);

//================================================

// 액션
export const changeInputs = createAction(CHANGE_INPUTS, ({ key, value }) => ({
  key, // username, password, passwordConfirm
  value, // 실제 바꾸려는 값
}));

export const changeUpdateInputs = createAction(
  CHANGE_UPDATE_INPUTS,
  ({ key, value }) => ({
    key,
    value,
  })
);

export const initalizeUpdateInputs = createAction(
  INITIALIZE_UPDATE_INPUTS,
  ({ _id, value }) => ({
    _id,
    value,
  })
);

export const initializeInputs = createAction(INITIALIZE_INPUTS);

export const initializeError = createAction(INITIALIZE_ERROR);

export const tempSetBuilding = createAction(
  TEMP_SET_BUILDING,
  (building) => building
);
export const getBuilding = createAction(GET);
export const insertBuilding = createAction(INSERT, (name) => ({
  name,
}));

export const udpateBuilding = createAction(UPDATE, ({ _id, name }) => ({
  _id,
  name,
}));

export const deleteBuilding = createAction(DELETE, (_id) => ({
  _id,
}));

//================================================

// saga 생성
const getSaga = createRequestSaga(GET, buildingAPI.getBuildingList);
const insertSaga = createRequestSaga(INSERT, buildingAPI.insertBuilding);
const updateSaga = createRequestSaga(UPDATE, buildingAPI.updateBuilding);
const deleteSaga = createRequestSaga(DELETE, buildingAPI.deleteBuilding);

export function* buildingSaga() {
  yield takeLatest(GET, getSaga);
  yield takeLatest(INSERT, insertSaga);
  yield takeLatest(UPDATE, updateSaga);
  yield takeLatest(DELETE, deleteSaga);
}

//================================================

// 초기화
export const initialState = {
  inputs: {
    name: "",
  },
  updateInputs: {
    _id: "",
    name: "",
  },
  building: null,
  error: {
    type: "",
    description: "",
  },
};
//================================================
export default handleActions(
  {
    [CHANGE_INPUTS]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft["inputs"][key] = value;
      }),
    [CHANGE_UPDATE_INPUTS]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft["updateInputs"][key] = value;
      }),
    [INITIALIZE_INPUTS]: (state) => ({
      ...state,
      inputs: initialState.inputs,
    }),

    [INITIALIZE_UPDATE_INPUTS]: (state, { payload: { _id, value } }) => ({
      ...state,
      updateInputs: { _id: _id, name: value },
    }),
    [INITIALIZE_ERROR]: (state) => ({
      ...state,
      error: initialState.error,
    }),

    [TEMP_SET_BUILDING]: (state, { payload: building }) => ({
      ...state,
      building,
    }),
    [GET_SUCCESS]: (state, { payload: building }) => ({
      ...state,
      error: initialState.error,
      building: building,
    }),
    [GET_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "get", description: error },
    }),
    [INSERT_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      building: state.building.concat(data),
    }),
    [INSERT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "insert", description: error },
    }),

    [UPDATE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      building: state.building.map((item) =>
        item._id === data._id ? { ...item, ...data } : item
      ),
    }),
    [UPDATE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "update", description: error },
    }),

    [DELETE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      building: state.building.filter((item) => item._id !== data),
    }),
    [DELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "delete", description: error },
    }),
  },
  initialState
);
