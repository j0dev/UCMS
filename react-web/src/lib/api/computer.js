import { accessClient } from "./client";

export const getClassList = () => accessClient.get("/class/list");

export const getClassroom = ({ _id }) =>
  accessClient.get("/computer/" + _id, { _id });

export const createOrder = ({ command, mac }) =>
  accessClient.post("/order/create", { command, mac });

export const createLockOrder = ({ command, mac, start, end }) =>
  accessClient.post("/order/create", { command, mac, start, end });

export const createLockSecondOrder = ({ command, mac, second }) =>
  accessClient.post("/order/create", { command, mac, second });

export const getInstallCheck = () => accessClient.get("/computer/install");
export const createInstallCheck = ({ name }) =>
  accessClient.post("/computer/install", { name });

export const computerDelete = ({ mac }) =>
  accessClient.post("/computer/delete", { mac });
