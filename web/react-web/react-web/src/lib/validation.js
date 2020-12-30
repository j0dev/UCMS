import { ACCESS_TOKEN, REFRESH_TOKEN } from "./config";
// import { check } from "../store/modules/user";

// const token = localStorage.getItem(ACCESS_TOKEN);

const authMiddleware = store => next => action => {
  //   if (token && !user) {
  //     store.dispatch(check());
  //   }
  // 현재 스토어 상태값 기록

  console.log("현재 상태", store.getState());

  // 액션 기록
  console.log("액션", action);
  if (action.type === "auth/LOGIN_SUCCESS") {
    // localStorage.setItem("accessToken", action.payload);
    try {
      console.log("login::", action.payload);
      localStorage.setItem(ACCESS_TOKEN, action.payload.token);
      localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
    } catch (e) {}
    // store.dispatch(check());
  }

  if (action.type === "token/REFRESH_FAILURE") {
  }

  // 액션을 다음 미들웨어, 혹은 리듀서로 넘김
  const result = next(action);

  // 액션 처리 후의 스토어 상태 기록
  console.log("다음 상태", store.getState());
  console.log("\n"); // 기록 구분을 위한 비어있는 줄 프린트

  return result; // 여기서 반환하는 값은 store.dispatch(ACTION_TYPE) 했을때의 결과로 설정됩니다
};

export default authMiddleware;
