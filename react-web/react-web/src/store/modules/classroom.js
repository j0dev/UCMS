import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as classroomAPI from "../../lib/api/classroom";

//================================================

const TEMP_SET_BUILDING = "classroom/TEMP_SET_BUILDING";
const TEMP_SET_CLASSROOM = "classroom/TEMP_SET_CLASSROOM";

const [
  GET_CLASSROOM,
  GET_CLASSROOM_SUCCESS,
  GET_CLASSROOM_FAILURE,
] = createRequestActionTypes("classroom/GET_CLASSROOM");
const [
  INSERT_CLASSROOM,
  INSERT_CLASSROOM_SUCCESS,
  INSERT_CLASSROOM_FAILURE,
] = createRequestActionTypes("classroom/INSERT_CLASSROOM");

const [
  UPDATE_CLASSROOM,
  UPDATE_CLASSROOM_SUCCESS,
  UPDATE_CLASSROOM_FAILURE,
] = createRequestActionTypes("classroom/UPDATE_CLASSROOM");
const [
  DELETE_CLASSROOM,
  DELETE_CLASSROOM_SUCCESS,
  DELETE_CLASSROOM_FAILURE,
] = createRequestActionTypes("classroom/DELETE_CALSSROOM");

const CHANGE_INPUTS = "classroom/CHANGE_INPUTS";
const INITIALIZE_FORM = "classroom/INITIALIZE_INPUTS";
const CHANGE_TARGET = "classroom/CHANGE_TARGET";
const CHANGE_LIST_TARGET = "classroom/CHANGE_LIST_TARGET";
const INITALIZE_UPDATE_INPUTS = "classroom/INITALIZE_UPDATE_INPUTS";

//================================================

// 액션
export const changeInputs = createAction(
  CHANGE_INPUTS,
  ({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  })
);

export const initalizeUpdateInputs = createAction(
  INITALIZE_UPDATE_INPUTS,
  ({ _id, classroomName, row, col, comCount }) => ({
    _id,
    classroomName,
    row,
    col,
    comCount,
  })
);

export const changeTarget = createAction(CHANGE_TARGET, (target) => target);
export const changeListTarget = createAction(
  CHANGE_LIST_TARGET,
  (target) => target
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const tempSetBuilding = createAction(
  TEMP_SET_BUILDING,
  (building) => building
);

export const getClassroom = createAction(GET_CLASSROOM, (buildingId) => ({
  buildingId,
}));

export const insertClassroom = createAction(
  INSERT_CLASSROOM,
  (buildingId, name, row, col, comCount) => ({
    buildingId,
    name,
    row,
    col,
    comCount,
  })
);

export const udpateClassroom = createAction(
  UPDATE_CLASSROOM,
  ({ _id, classroomName, row, col, comCount }) => ({
    _id,
    classroomName,
    row,
    col,
    comCount,
  })
);

export const deleteClassroom = createAction(
  DELETE_CLASSROOM,
  (classroomId) => ({
    classroomId,
  })
);

//================================================

// saga 생성
const getSaga = createRequestSaga(GET_CLASSROOM, classroomAPI.getClassroomList);
const insertSaga = createRequestSaga(
  INSERT_CLASSROOM,
  classroomAPI.insertClassroom
);
const updateSaga = createRequestSaga(
  UPDATE_CLASSROOM,
  classroomAPI.updateClassroom
);
const deleteSaga = createRequestSaga(
  DELETE_CLASSROOM,
  classroomAPI.deleteClassroom
);

export function* classroomSaga() {
  yield takeLatest(GET_CLASSROOM, getSaga);
  yield takeLatest(INSERT_CLASSROOM, insertSaga);
  yield takeLatest(UPDATE_CLASSROOM, updateSaga);
  yield takeLatest(DELETE_CLASSROOM, deleteSaga);
}

//================================================

// 초기화
export const initialState = {
  inputs: {
    classroomName: "",
    row: "",
    col: "",
    comCount: "",
  },
  updateInputs: {
    _id: "",
    classroomName: "",
    row: "",
    col: "",
    comCount: "",
  },
  target: "default",
  listTarget: "default",
  classroom: null,
  error: {
    type: null,
    description: null,
  },
};
//================================================
export default handleActions(
  {
    [CHANGE_INPUTS]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [CHANGE_TARGET]: (state, { payload: target }) => ({
      ...state,
      target: target,
    }),
    [CHANGE_LIST_TARGET]: (state, { payload: target }) => ({
      ...state,
      listTarget: target,
    }),
    [INITALIZE_UPDATE_INPUTS]: (
      state,
      { payload: { _id, classroomName, row, col, comCount } }
    ) => ({
      ...state,
      updateInputs: {
        _id: _id,
        classroomName: classroomName,
        row: row,
        col: col,
        comCount: comCount,
      },
    }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
      result: null,
    }),
    [TEMP_SET_CLASSROOM]: (state) => ({
      ...state,
      classroom: initialState.classroom,
    }),

    [TEMP_SET_BUILDING]: (state, { payload: building }) => ({
      ...state,
      building,
    }),

    [GET_CLASSROOM_SUCCESS]: (state, { payload: classroom }) => ({
      ...state,
      error: initialState.error,
      classroom: classroom.classRoomId,
    }),
    [GET_CLASSROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "getClassroom", description: error },
      classroom: initialState.classroom,
    }),
    [INSERT_CLASSROOM_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      classroom: state.classroom.concat(data),
    }),
    [INSERT_CLASSROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "insertClassroom", description: error },
    }),

    [UPDATE_CLASSROOM_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      classroom: state.classroom.map((item) =>
        item._id === data._id ? { ...item, ...data } : item
      ),
    }),
    [UPDATE_CLASSROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "updateClassroom", description: error },
    }),

    [DELETE_CLASSROOM_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      classroom: state.classroom.filter((item) => item._id !== data),
    }),
    [DELETE_CLASSROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "delete", description: error },
    }),
  },
  initialState
);
