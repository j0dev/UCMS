import React, { useState, useEffect, useCallback } from "react";
import Building from "../components/Building/Building";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getBuilding,
  changeInputs,
  insertBuilding,
  udpateBuilding,
  deleteBuilding,
  changeUpdateInputs,
  initalizeUpdateInputs
} from "../store/modules/building";

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

function BuildingContainer() {
  const dispatch = useDispatch();

  // store data 가져오기
  const { error, building } = useSelector(state => state.building);
  const name = useSelector(state => state.building.inputs.name);
  const updateInputs = useSelector(state => state.building.updateInputs);
  const getLoading = useSelector(state => state.loading["building/GET"]);

  const insertLoading = useSelector(state => state.loading["building/INSERT"]);

  // Building List Load
  useEffect(() => {
    if (!error.type && building === null) {
      dispatch(getBuilding());
    }
  }, [building, dispatch, error.type]);

  //내부에서 사용할 Dialog state
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [targetId, setTargetId] = useState("");

  const onEditClick = e => {
    const updateId = e.target.dataset.index;

    console.log(updateId);
    const value = e.target.dataset.value;
    console.log(value);
    dispatch(initalizeUpdateInputs({ _id: updateId, value }));
    setDialogEdit(true);
  };
  const onEdit = () => {
    dispatch(udpateBuilding(updateInputs));
    setDialogEdit(false);
  };
  const onEditCancel = () => {
    setTargetId("");
    setDialogEdit(false);
  };

  const onDeleteClick = e => {
    const _id = e.target.dataset.index;
    setTargetId(_id);

    setDialogDelete(true);
  };
  const onDelete = () => {
    dispatch(deleteBuilding(targetId));
    setDialogDelete(false);
  };

  const onDeleteCancel = () => {
    setTargetId("");
    setDialogDelete(false);
  };

  const onUpdateChange = e => {
    const { name, value } = e.target;
    dispatch(changeUpdateInputs({ key: name, value: value }));
  };

  const onChange = e => {
    const { name, value } = e.target;
    dispatch(changeInputs({ key: name, value: value }));
  };

  const insertSubmit = useCallback(
    async e => {
      e.preventDefault();
      await dispatch(insertBuilding(name));
    },
    [dispatch, name]
  );

  return (
    <Container>
      <Building
        dialogEdit={dialogEdit}
        onEditClick={onEditClick}
        onEdit={onEdit}
        onEditCancel={onEditCancel}
        dialogDelete={dialogDelete}
        onDeleteClick={onDeleteClick}
        onDelete={onDelete}
        onDeleteCancel={onDeleteCancel}
        building={building}
        getLoading={getLoading}
        insertLoading={insertLoading}
        name={name}
        onChange={onChange}
        insertSubmit={insertSubmit}
        error={error}
        updateName={updateInputs.name}
        onUpdateChange={onUpdateChange}
      ></Building>
    </Container>
  );
}

export default BuildingContainer;
