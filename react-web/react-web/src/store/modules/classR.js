import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as classAPI from "../../lib/api/class";
import * as classroomAPI from "../../lib/api/classroom";

//================================================

const [
  GET_CLASS,
  GET_CLASS_SUCCESS,
  GET_CLASS_FAILURE,
] = createRequestActionTypes("class/GET_CLASS");

const [
  INSERT_CLASS,
  INSERT_CLASS_SUCCESS,
  INSERT_CLASS_FAILURE,
] = createRequestActionTypes("class/INSERT_CLASS");

const [
  DELETE_CLASS,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_FAILURE,
] = createRequestActionTypes("class/DELETE_CLASS");

const CHANGE_INPUTS = "class/CHANGE_INPUTS";

const INITIALIZE_FORM = "class/INITIALIZE_INPUTS";
const CHANGE_BUILDING_TARGET = "class/CHANGE_BUILDING_TARGET";
const CHANGE_CLASSROOM_TARGET = "class/CHANGE_CLASSROOM_TARGET";

const [
  GET_CLASSROOM,
  GET_CLASSROOM_SUCCESS,
  GET_CLASSROOM_FAILURE,
] = createRequestActionTypes("class/GET_CLASSROOM");

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

export const changeBuildingTarget = createAction(
  CHANGE_BUILDING_TARGET,
  (target) => target
);
export const changeClassroomTarget = createAction(
  CHANGE_CLASSROOM_TARGET,
  (target) => target
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const getClass = createAction(GET_CLASS, () => ({}));

export const insertClassR = createAction(
  INSERT_CLASS,
  (name, buildingId, classRoomId) => ({
    name,
    buildingId,
    classRoomId,
  })
);

export const deleteClassR = createAction(DELETE_CLASS, (classId) => ({
  classId,
}));

export const getClassroom = createAction(GET_CLASSROOM, (buildingId) => ({
  buildingId,
}));

//================================================

// saga 생성
const getSaga = createRequestSaga(GET_CLASS, classAPI.getClassList);
const insertSaga = createRequestSaga(INSERT_CLASS, classAPI.insertClass);
const deleteSaga = createRequestSaga(DELETE_CLASS, classAPI.deleteClass);
const getClassroomSaga = createRequestSaga(
  GET_CLASSROOM,
  classroomAPI.getClassroomList
);

export function* classSaga() {
  yield takeLatest(GET_CLASS, getSaga);
  yield takeLatest(INSERT_CLASS, insertSaga);
  yield takeLatest(DELETE_CLASS, deleteSaga);
  yield takeLatest(GET_CLASSROOM, getClassroomSaga);
}

//================================================

// 초기화
export const initialState = {
  inputs: {
    className: "",
  },
  updateInputs: {
    className: "",
  },
  buildingTarget: "default",
  classroomTarget: "default",
  classroom: null,
  classList: null,
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
    [CHANGE_BUILDING_TARGET]: (state, { payload: target }) => ({
      ...state,
      buildingTarget: target,
    }),
    [CHANGE_CLASSROOM_TARGET]: (state, { payload: target }) => ({
      ...state,
      classroomTarget: target,
    }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
      result: null,
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

    [GET_CLASS_SUCCESS]: (state, { payload: classList }) => ({
      ...state,
      error: initialState.error,
      classList: classList,
    }),
    [GET_CLASS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "getClass", description: error },
      classList: initialState.class,
    }),
    [INSERT_CLASS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      classList: state.classList.concat(data),
    }),
    [INSERT_CLASS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "insertClass", description: error },
    }),
    [DELETE_CLASS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      classList: state.classList.filter((item) => item._id !== data),
    }),
    [DELETE_CLASS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "insertClass", description: error },
    }),
  },
  initialState
);
