import { accessClient } from "./client";

export const getClassList = () => accessClient.get("/class");

export const insertClass = ({ name, buildingId, classRoomId }) =>
  accessClient.post("/class/", {
    name,
    buildingId,
    classRoomId,
  });

export const deleteClass = ({ classId }) =>
  accessClient.delete("/class/" + classId, {});

// export const updateClassroom = ({ _id, classroomName, row, col, comCount }) =>
//   accessClient.put("/classroom/", {
//     _id,
//     classroomName,
//     row,
//     col,
//     comCount,
//   });
