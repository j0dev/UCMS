import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as authAPI from "../../lib/api/auth";

//================================================
const CHANGE_FIELD = "auth/CHANGE_FIELD";
const CHANGE_REGISTER_FIELD = "auth/CHANGE_REGISTER_FIELD";
const CHANGE_RADIO = "auth/CHANGE_RADIO";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  "auth/LOGIN"
);

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  "auth/REGITSER"
);
//================================================

// 액션
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);
export const changeRegisterField = createAction(
  CHANGE_REGISTER_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);

export const changeRadio = createAction(CHANGE_RADIO, value => ({
  value
}));

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const userLogin = createAction(LOGIN, ({ userid, password }) => ({
  userid,
  password
}));

export const userRegister = createAction(
  REGISTER,
  ({ userid, password, username, type }) => ({
    userid,
    password,
    username,
    type
  })
);
//================================================

// saga 생성
const userLoginSaga = createRequestSaga(LOGIN, authAPI.userLogin);
const userRegisterSaga = createRequestSaga(REGISTER, authAPI.userRegister);

export function* authSaga() {
  yield takeLatest(LOGIN, userLoginSaga);
  yield takeLatest(REGISTER, userRegisterSaga);
}

//================================================

// 초기화
export const initialState = {
  login: {
    userid: "",
    password: ""
  },
  register: {
    userid: "",
    password: "",
    passwordVerify: "",
    username: "",
    type: ""
  },
  result: null,
  token: null,
  refreshToken: null,
  authError: null
};
//================================================

const auth = handleActions(
  {
    [CHANGE_RADIO]: (state, { payload: value }) => ({
      ...state,
      type: value
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [CHANGE_REGISTER_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
      result: null
    }),

    [LOGIN_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      authError: null,
      token: data.token,
      refreshToken: data.refreshToken,
      result: ""
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    [REGISTER_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      authError: null,
      result
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    })
  },
  initialState
);

export default auth;
