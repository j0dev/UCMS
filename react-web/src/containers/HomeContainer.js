import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import Home from "../components/menu/Home";
import { useDispatch, useSelector } from "react-redux";
import { getBuilding } from "../store/modules/building";
import {
  getClassroom,
  changeBuildingTarget,
  changeClassroomTarget
} from "../store/modules/classR";
import { getClassroomDetail, getInstallCheck } from "../store/modules/home";
import { useHistory } from "react-router-dom";

// import { getClassroom } from "../store/modules/computer";

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

function HomeContainer() {
  const history = useHistory();
  const getLoading = useSelector(state => state.loading["home/GET_CLASSROOM"]);

  const dispatch = useDispatch();
  const building = useSelector(state => state.building.building);
  const classroomList = useSelector(state => state.classR.classroom || "");

  const { detail, install } = useSelector(state => state.home);
  useEffect(() => {
    if (building === null) {
      dispatch(getBuilding());
    }
    if (install === null) {
      dispatch(getInstallCheck());
    }
  }, [building, dispatch, install]);

  const setBuildingTarget = useCallback(
    async e => {
      e.preventDefault();
      const value = e.target.value;
      console.log(value);
      await dispatch(changeBuildingTarget(value));

      await dispatch(getClassroom(value));
    },
    [dispatch]
  );

  const setClassroomTarget = useCallback(
    async e => {
      e.preventDefault();
      const value = e.target.value;
      await dispatch(changeClassroomTarget(value));
      await dispatch(getClassroomDetail(value));
      await dispatch(getInstallCheck());
    },
    [dispatch]
  );
  const { buildingTarget, classroomTarget } = useSelector(
    state => state.classR
  );
  console.log(1111, classroomList);

  const onClick = e => {
    const _id = e.target.dataset.index;
    history.push("/computer/detail/" + _id);
  };

  return (
    <Container>
      <Home
        building={building}
        classroomList={classroomList}
        setBuildingTarget={setBuildingTarget}
        setClassroomTarget={setClassroomTarget}
        buildingTarget={buildingTarget}
        classroomTarget={classroomTarget}
        detail={detail}
        install={install}
        getLoading={getLoading}
        onClick={onClick}
      ></Home>
    </Container>
  );
}

export default HomeContainer;
