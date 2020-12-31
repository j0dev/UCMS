import { accessClient } from "./client";

export const getInstallList = () => accessClient.get("/computer/install");
export const insertInstallList = ({ name }) =>
  accessClient.post("/computer/install", { name });
export const updateInstallList = ({ _id, name }) =>
  accessClient.post("/computer/install/update", { _id, name });
export const deleteInstallList = ({ _id }) =>
  accessClient.post("/computer/install/delete", { _id });
