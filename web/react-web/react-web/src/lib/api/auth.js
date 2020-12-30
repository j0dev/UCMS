import { client, accessClient, refreshClient } from "./client";

// 유저 로그인
export const userLogin = ({ userid, password }) =>
  client.post("/auth/login", { userid, password });
// axios.get("https://hackrss.kr/tester/today?page=1", {});

export const userRegister = ({ userid, password, username, type }) =>
  client.post("/auth/register", {
    userid,
    password,
    username,
    type
  });

export const check = () => accessClient.get("/account/user", {});

export const refresh = () => refreshClient.post("/auth/refresh", {});
