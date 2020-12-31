import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as computerApi from "../../lib/api/computer";
import * as userManageApi from "../../lib/api/userManage";
import * as classOrderApi from "../../lib/api/detail";

//================================================

const [
  GET_CLASS,
  GET_CLASS_SUCCESS,
  GET_CLASS_FAILURE
] = createRequestActionTypes("computer/GET_CLASS");

const [
  GET_CLASSROOM,
  GET_CLASSROOM_SUCCESS,
  GET_CLASSROOM_FAILURE
] = createRequestActionTypes("computer/GET_CLASSROOM");

const CHANGE_TARGET = "computer/CHANGE_TARGET";

const CHANGE_SECOND = "computer/CHANGE_SECOND";

const CHANGE_ORDER_TARGET = "classroom/CHANGE_ORDER_TARGET";

const DELETE_COMPUTER = "computer/DELETE_COMPUTER";

const [
  POST_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILURE
] = createRequestActionTypes("computer/POST_ORDER");

const [
  POST_LOCK_SECOND_ORDER,
  POST_LOCK_SECOND_ORDER_SUCCESS,
  POST_LOCK_SECOND_ORDER_FAILURE
] = createRequestActionTypes("computer/POST_LOCK_SECOND_ORDER");

const [
  POST_CLASS_ORDER,
  POST_CLASS_ORDER_SUCCESS,
  POST_CLASS_ORDER_FAILURE
] = createRequestActionTypes("computer/POST_CLASS_ORDER");

const [
  POST_CLASS_LOCK_SECOND_ORDER,
  POST_CLASS_LOCK_SECOND_ORDER_SUCCESS,
  POST_CLASS_LOCK_SECOND_ORDER_FAILURE
] = createRequestActionTypes("computer/POST_CLASS_LOCK_SECOND_ORDER");

const [
  INSERT_USER_CLASS,
  INSERT_USER_CLASS_SUCCESS,
  INSERT_USER_CLASS_FAILRUE
] = createRequestActionTypes("userManage/GET_USER_CLASS");

const CHANGE_USER_TARGET = "classroom/CHANGE_USER_TARGET";
//================================================

// 액션

export const changeSecond = createAction(CHANGE_SECOND, value => value);
export const getClass = createAction(GET_CLASS, () => ({}));

export const changeOrderTarget = createAction(
  CHANGE_ORDER_TARGET,
  orderTarget => orderTarget
);

export const getClassroom = createAction(GET_CLASSROOM, _id => ({
  _id
}));

export const insertUserClass = createAction(
  INSERT_USER_CLASS,
  (_id, userId) => ({
    _id,
    userId
  })
);

export const postOrder = createAction(POST_ORDER, (mac, command) => ({
  mac,
  command
}));

export const postLockSecondOrder = createAction(
  POST_LOCK_SECOND_ORDER,
  (mac, command, second) => ({
    mac,
    command,
    second
  })
);

export const postClassOrder = createAction(
  POST_CLASS_ORDER,
  (classRoomId, command) => ({
    classRoomId,
    command
  })
);

export const postClassLockSecondOrder = createAction(
  POST_CLASS_LOCK_SECOND_ORDER,
  (classRoomId, command, second) => ({
    classRoomId,
    command,
    second
  })
);

export const deleteComputer = createAction(DELETE_COMPUTER, mac => ({ mac }));

export const changeTarget = createAction(
  CHANGE_TARGET,
  targetClassroom => targetClassroom
);

export const changeUserTarget = createAction(
  CHANGE_USER_TARGET,
  target => target
);

//================================================

// saga 생성
const getClassSaga = createRequestSaga(GET_CLASS, computerApi.getClassList);
const insertUserClassSaga = createRequestSaga(
  INSERT_USER_CLASS,
  userManageApi.insertUserClass
);
const getClassroomSaga = createRequestSaga(
  GET_CLASSROOM,
  computerApi.getClassroom
);

const deleteComputerSaga = createRequestSaga(
  DELETE_COMPUTER,
  computerApi.computerDelete
);
const postOrderSaga = createRequestSaga(POST_ORDER, computerApi.createOrder);
const postLockSecondOrderSaga = createRequestSaga(
  POST_LOCK_SECOND_ORDER,
  computerApi.createLockSecondOrder
);

const postClassOrderSaga = createRequestSaga(
  POST_CLASS_ORDER,
  classOrderApi.createOrder
);
const postClassLockSecondOrderSaga = createRequestSaga(
  POST_CLASS_LOCK_SECOND_ORDER,
  classOrderApi.createLockSecondOrder
);

export function* computerSaga() {
  yield takeLatest(GET_CLASS, getClassSaga);
  yield takeLatest(GET_CLASSROOM, getClassroomSaga);
  yield takeLatest(POST_ORDER, postOrderSaga);
  yield takeLatest(POST_LOCK_SECOND_ORDER, postLockSecondOrderSaga);
  yield takeLatest(POST_CLASS_ORDER, postClassOrderSaga);
  yield takeLatest(POST_CLASS_LOCK_SECOND_ORDER, postClassLockSecondOrderSaga);
  yield takeLatest(INSERT_USER_CLASS, insertUserClassSaga);
  yield takeLatest(DELETE_COMPUTER, deleteComputerSaga);
}

//================================================

// 초기화
export const initialState = {
  classList: null,
  detail: null,
  error: {
    type: null,
    description: null
  },
  orderTarget: "default",
  targetClassroom: "",
  orderResult: "",
  orderError: "",
  second: "",
  start: "",
  end: "",
  done: "",
  target: "default"
};
//================================================
export default handleActions(
  {
    [CHANGE_SECOND]: (state, { payload: value }) =>
      produce(state, draft => {
        draft["second"] = value;
      }),
    [CHANGE_ORDER_TARGET]: (state, { payload: orderTarget }) => ({
      ...state,
      orderTarget: orderTarget
    }),
    [CHANGE_USER_TARGET]: (state, { payload: target }) => ({
      ...state,
      target: target
    }),
    [CHANGE_TARGET]: (state, { payload: targetClassroom }) => ({
      ...state,
      targetClassroom: targetClassroom
    }),
    [GET_CLASS_SUCCESS]: (state, { payload: classList }) => ({
      ...state,
      error: initialState.error,
      classList: classList
    }),
    [GET_CLASS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "getClass", description: error },
      classList: initialState.classList
    }),
    [GET_CLASSROOM_SUCCESS]: (state, { payload: classroom }) => ({
      ...state,
      error: initialState.error,
      detail: classroom
    }),
    [GET_CLASSROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "getClassroom", description: error },
      detail: initialState.detail
    }),

    [INSERT_USER_CLASS_SUCCESS]: (state, { payload: classroom }) => ({
      ...state,
      error: initialState.error,
      done: classroom
    }),
    [INSERT_USER_CLASS_FAILRUE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "insertUserClass", description: error },
      done: initialState.done
    }),

    [POST_ORDER_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      orderError: initialState.orderError,
      orderResult: result
    }),
    [POST_ORDER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      orderError: error,
      orderResult: initialState.orderResult
    }),
    [POST_LOCK_SECOND_ORDER_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      orderError: initialState.orderError,
      orderResult: result
    }),
    [POST_LOCK_SECOND_ORDER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      orderError: error,
      orderResult: initialState.orderResult
    }),

    [POST_CLASS_ORDER_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      orderError: initialState.orderError,
      orderResult: result
    }),
    [POST_CLASS_ORDER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      orderError: error,
      orderResult: initialState.orderResult
    }),
    [POST_CLASS_LOCK_SECOND_ORDER_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      orderError: initialState.orderError,
      orderResult: result
    }),
    [POST_CLASS_LOCK_SECOND_ORDER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      orderError: error,
      orderResult: initialState.orderResult
    })
  },
  initialState
);
