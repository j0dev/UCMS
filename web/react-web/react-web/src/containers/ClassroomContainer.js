import React, { useEffect, useCallback, useState } from "react";
import Classroom from "../components/Classroom/Classroom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  changeInputs,
  changeTarget,
  changeListTarget,
  insertClassroom,
  getClassroom,
  initalizeUpdateInputs,
  deleteClassroom,
  udpateClassroom,
} from "../store/modules/classroom";

import { getBuilding } from "../store/modules/building";
const Container = styled.div`
  width: 100%;
  display: inline-block;

  height: 100%;
  min-height: 100%;

  @media (min-width: 1081px) {
    padding-left: 30em;
    width: calc(100% - 300px);
    display: block;
  }
`;

function ClassroomContainer() {
  const dispatch = useDispatch();

  // get redux state
  const building = useSelector((state) => state.building.building);
  const error = useSelector((state) => state.classroom.error);
  const target = useSelector((state) => state.classroom.target);
  const listTarget = useSelector((state) => state.classroom.listTarget);
  const { classroomName, row, col, comCount } = useSelector(
    (state) => state.classroom.inputs
  );
  const updateInputs = useSelector((state) => state.classroom.updateInputs);
  const classroomList = useSelector((state) => state.classroom.classroom || "");

  // get building list

  useEffect(() => {
    if (building === null && error.type === null) {
      dispatch(getBuilding());
    }
  }, [building, dispatch, error]);

  // input change function
  const createOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInputs({
        form: "inputs",
        key: name,
        value: value,
      })
    );
  };
  const updateOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInputs({
        form: "updateInputs",
        key: name,
        value: value,
      })
    );
  };

  // select box change function

  const targetOnChange = (e) => {
    const value = e.target.value;
    dispatch(changeTarget(value));
  };
  const listTargetOnChange = (e) => {
    const value = e.target.value;
    dispatch(changeListTarget(value));
  };

  // create classroom function

  const createClassroom = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(classroomName);
      await dispatch(
        insertClassroom(target, classroomName, row, col, comCount)
      );
    },
    [col, comCount, classroomName, dispatch, row, target]
  );

  const getClassroomList = useCallback(
    async (e) => {
      e.preventDefault();
      const value = e.target.value;
      console.log(value);
      await dispatch(changeListTarget(value));

      await dispatch(getClassroom(value));
    },
    [dispatch]
  );

  //내부에서 사용할 Dialog state
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [targetId, setTargetId] = useState("");

  const onEditClick = (e) => {
    const updateId = e.target.dataset.index;

    console.log(updateInputs);
    const value = e.target.dataset.value;
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    const comCount = e.target.dataset.comcount;
    console.log(value);
    dispatch(
      initalizeUpdateInputs({
        _id: updateId,
        classroomName: value,
        row: row,
        col: col,
        comCount: comCount,
      })
    );
    setDialogEdit(true);
  };
  // const onEdit = () => {
  //   dispatch(udpateBuilding(updateInputs));
  //   setDialogEdit(false);
  // };
  const onEditCancel = () => {
    setTargetId("");
    setDialogEdit(false);
  };

  const onDeleteClick = (e) => {
    const _id = e.target.dataset.index;
    setTargetId(_id);
    console.log(_id);

    setDialogDelete(true);
  };
  // const onDelete = () => {
  //   dispatch(deleteBuilding(targetId));
  //   setDialogDelete(false);
  // };

  const onDeleteCancel = () => {
    setTargetId("");
    setDialogDelete(false);
  };
  const onEdit = () => {
    dispatch(udpateClassroom(updateInputs));
    setDialogEdit(false);
  };

  const onDelete = () => {
    dispatch(deleteClassroom(targetId));
    setDialogDelete(false);
  };

  return (
    <Container>
      <Classroom
        createOnChange={createOnChange}
        createName={classroomName}
        updateOnChange={updateOnChange}
        building={building}
        targetOnChange={targetOnChange}
        listTargetOnChange={listTargetOnChange}
        target={target}
        listTarget={listTarget}
        row={row}
        col={col}
        comCount={comCount}
        createClassroom={createClassroom}
        getClassroomList={getClassroomList}
        classroomList={classroomList}
        updateInputs={updateInputs}
        dialogEdit={dialogEdit}
        dialogDelete={dialogDelete}
        targetId={targetId}
        onEditClick={onEditClick}
        onEditCancel={onEditCancel}
        onDeleteClick={onDeleteClick}
        onDeleteCancel={onDeleteCancel}
        onEdit={onEdit}
        onDelete={onDelete}
      ></Classroom>
    </Container>
  );
}

export default ClassroomContainer;
