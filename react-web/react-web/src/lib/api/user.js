import { accessClient } from "./client";

export const getNotActiveUser = () => accessClient.get("/account/notuser", {});
export const getActiveUser = () => accessClient.get("/account/anduser", {});

export const deleteUser = ({ _id }) =>
  accessClient.post("/account/delete/", { _id });

export const updateUser = ({ _id }) =>
  accessClient.post("/account/active/", {
    _id
  });
