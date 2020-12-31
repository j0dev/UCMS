import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as userManageApi from "../../lib/api/userManage";

//================================================
const [
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILRUE
] = createRequestActionTypes("userManage/GET_USER_LIST");

//================================================

// 액션

export const getUserList = createAction(GET_USER_LIST);

//================================================]

const getUserListSaga = createRequestSaga(
  GET_USER_LIST,
  userManageApi.getUserList
);

export function* userManageSaga() {
  yield takeLatest(GET_USER_LIST, getUserListSaga);
}
//================================================

// 초기화
export const initialState = {
  userList: null,
  error: null
};
//================================================
export default handleActions(
  {
    [GET_USER_LIST_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      error: initialState.error,
      userList: user
    }),
    [GET_USER_LIST_FAILRUE]: (state, { payload: error }) => ({
      ...state,
      error: error
    })
  },
  initialState
);
