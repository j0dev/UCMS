import { accessClient } from "./client";

export const getClassroomList = ({ buildingId }) =>
  accessClient.get("/classroom/" + buildingId, {});

export const insertClassroom = ({ buildingId, name, row, col, comCount }) =>
  accessClient.post("/classroom/", {
    buildingId,
    name,
    row,
    col,
    comCount,
  });

export const deleteClassroom = ({ classroomId }) =>
  accessClient.delete("/classroom/" + classroomId, {});

export const updateClassroom = ({ _id, classroomName, row, col, comCount }) =>
  accessClient.put("/classroom/", {
    _id,
    classroomName,
    row,
    col,
    comCount,
  });
