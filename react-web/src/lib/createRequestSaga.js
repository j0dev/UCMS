import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../store/modules/loading";

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);

      // if (!response.data.results) {
      //   window.location.replace("/login");
      // }
      type === "auth/LOGIN"
        ? yield put({
            type: SUCCESS,
            payload: response.data,
            meta: response
          })
        : yield put({
            type: SUCCESS,
            payload: response.data.message,
            meta: response
          });
    } catch (e) {
      const { response } = e;
      if (response && response.status === 403) {
        yield put({
          type: FAILURE,
          payload: e.response.data.message,
          error: true
        });
      } else if (response && response.status === 401) {
        yield put({
          type: FAILURE,
          payload: e.response.data.message,
          error: true
        });
      } else {
        yield put({
          type: FAILURE,
          payload: e.response.data,
          error: true
        });
      }
    }

    yield put(finishLoading(type)); // 로딩 끝
  };
}
