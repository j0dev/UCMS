import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from "../config";

export const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 180000,
  withCredentials: false,

  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 180000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "x-access-token": `${localStorage.getItem(REFRESH_TOKEN)}`,
  },
});

export const accessClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 180000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "x-access-token": `${localStorage.getItem(ACCESS_TOKEN)}`,
  },
});

accessClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // const refresh = refreshClient.post("auth/refresh", {});
      refreshClient.post("/auth/refresh", {});
    }
  }
);

refreshClient.interceptors.response.use(
  function (response) {
    localStorage.setItem(ACCESS_TOKEN, response.data.token);
    window.location.reload();
  },
  function (error) {
    localStorage.setItem(ACCESS_TOKEN, "");
    localStorage.setItem(REFRESH_TOKEN, "");
    window.location.reload("/login");
  }
);
