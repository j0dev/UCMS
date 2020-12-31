import { accessClient } from "./client";

export const createOrder = ({ command, classRoomId }) =>
  accessClient.post("/order/createall", { command, _id: classRoomId });

export const createLockOrder = ({ command, classRoomId, start, end }) =>
  accessClient.post("/order/createall", {
    command,
    _id: classRoomId,
    start,
    end
  });

export const createLockSecondOrder = ({ command, classRoomId, second }) =>
  accessClient.post("/order/createall", {
    command,
    _id: classRoomId,
    second
  });
