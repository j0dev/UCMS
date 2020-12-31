import React, { useEffect, useCallback, useState } from "react";
import Class from "../components/Class/Class";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getBuilding } from "../store/modules/building";
import {
  getClassroom,
  changeBuildingTarget,
  getClass,
  changeClassroomTarget,
  changeInputs,
  insertClassR,
  deleteClassR,
} from "../store/modules/classR";

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

function ClassContainer() {
  const dispatch = useDispatch();
  const building = useSelector((state) => state.building.building);
  const classroomList = useSelector((state) => state.classR.classroom || "");
  const classList = useSelector((state) => state.classR.classList);
  const className = useSelector((state) => state.classR.inputs.className);
  const updateClassName = useSelector(
    (state) => state.classR.updateInputs.className
  );

  const { buildingTarget, classroomTarget } = useSelector(
    (state) => state.classR
  );

  useEffect(() => {
    if (building === null) {
      dispatch(getBuilding());
    }
    if (classList === null) {
      dispatch(getClass());
    }
  }, [building, classList, dispatch]);

  const setBuildingTarget = useCallback(
    async (e) => {
      e.preventDefault();
      const value = e.target.value;
      console.log(value);
      await dispatch(changeBuildingTarget(value));

      await dispatch(getClassroom(value));
    },
    [dispatch]
  );

  const setClassroomTarget = useCallback(
    async (e) => {
      e.preventDefault();
      const value = e.target.value;
      await dispatch(changeClassroomTarget(value));
    },
    [dispatch]
  );

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

  //isnert submit
  const insertClass = useCallback(
    async (e) => {
      e.preventDefault();

      await dispatch(insertClassR(className, buildingTarget, classroomTarget));
    },
    [buildingTarget, className, classroomTarget, dispatch]
  );
  // get redux state

  const [dialogDelete, setDialogDelete] = useState(false);
  const [targetId, setTargetId] = useState("");
  const onDeleteClick = (e) => {
    const _id = e.target.dataset.index;
    setTargetId(_id);
    console.log(_id);

    setDialogDelete(true);
  };
  const onDeleteCancel = () => {
    setTargetId("");
    setDialogDelete(false);
  };
  const onDelete = () => {
    dispatch(deleteClassR(targetId));
    setDialogDelete(false);
  };

  return (
    <Container>
      <Class
        building={building}
        classroomList={classroomList}
        setBuildingTarget={setBuildingTarget}
        buildingTarget={buildingTarget}
        classroomTarget={classroomTarget}
        setClassroomTarget={setClassroomTarget}
        createOnChange={createOnChange}
        className={className}
        insertClass={insertClass}
        classList={classList}
        targetId={targetId}
        dialogDelete={dialogDelete}
        onDeleteClick={onDeleteClick}
        updateClassName={updateClassName}
        onDeleteCancel={onDeleteCancel}
        onDelete={onDelete}
        updateOnChange={updateOnChange}
      ></Class>
    </Container>
  );
}

export default ClassContainer;
