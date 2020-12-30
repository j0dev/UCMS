import { accessClient } from "./client";

export const getUserList = () => accessClient.get("/account/student", {});
export const insertUserClass = ({ _id, userId }) =>
  accessClient.post("/account/insert", { _id, userId });
