import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as authAPI from "../../lib/api/auth";

//================================================

const [REFRESH, REFRESH_SUCCESS, REFRESH_FAILURE] = createRequestActionTypes(
  "token/REFRESH"
);

//================================================

// 액션

export const refreshToken = createAction(REFRESH, () => ({
  refreshToken,
}));

//================================================

// saga 생성
const refershTokenSaga = createRequestSaga(REFRESH, authAPI.refresh);

export function* tokenSaga() {
  yield takeLatest(REFRESH, refershTokenSaga);
}

//================================================

// 초기화
export const initialState = {
  token: null,
  error: null,
};
//================================================

const token = handleActions(
  {
    [REFRESH_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: null,
      token: data.token,
    }),
    [REFRESH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
  },
  initialState
);

export default token;
