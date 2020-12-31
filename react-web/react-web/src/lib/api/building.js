import { accessClient } from "./client";

export const getBuildingList = () => accessClient.get("/building/", {});
export const insertBuilding = ({ name }) =>
  accessClient.post("/building/", { name });
export const deleteBuilding = ({ _id }) =>
  accessClient.delete("/building/" + _id, {});
export const updateBuilding = ({ _id, name }) =>
  accessClient.put("/building/", { _id, name });
