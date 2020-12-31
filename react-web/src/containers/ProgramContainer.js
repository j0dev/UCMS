import React, { useState, useEffect, useCallback } from "react";
import Program from "../components/Program/Program";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getInstallList,
  changeInputs,
  insertInstallList,
  updateInstallList,
  deleteInstallList,
  changeUpdateInputs,
  initalizeUpdateInputs
} from "../store/modules/program";

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

function ProgramContainer() {
  const dispatch = useDispatch();

  // store data 가져오기
  const error = useSelector(state => state.program.error);
  const installList = useSelector(state => state.program.installList);
  const name = useSelector(state => state.program.inputs.name);
  const updateInputs = useSelector(state => state.program.updateInputs);
  const getLoading = useSelector(
    state => state.loading["program/GET_INSTALL_LIST"]
  );

  const insertLoading = useSelector(
    state => state.loading["program/IHNSERT_INSTALL_LIST"]
  );

  // Building List Load
  useEffect(() => {
    if (installList === null) {
      dispatch(getInstallList());
    }
  }, [installList, dispatch, error.type]);
  //내부에서 사용할 Dialog state
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [targetId, setTargetId] = useState("");

  const onEditClick = e => {
    const updateId = e.target.dataset.index;
    const value = e.target.dataset.value;
    dispatch(initalizeUpdateInputs({ _id: updateId, value }));
    setDialogEdit(true);
  };
  const onEdit = () => {
    dispatch(updateInstallList(updateInputs));
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
    console.log("delete", targetId);
    dispatch(deleteInstallList(targetId));
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
      await dispatch(insertInstallList(name));
    },
    [dispatch, name]
  );

  return (
    <Container>
      <Program
        dialogEdit={dialogEdit}
        onEditClick={onEditClick}
        onEdit={onEdit}
        onEditCancel={onEditCancel}
        dialogDelete={dialogDelete}
        onDeleteClick={onDeleteClick}
        onDelete={onDelete}
        onDeleteCancel={onDeleteCancel}
        installList={installList}
        getLoading={getLoading}
        insertLoading={insertLoading}
        name={name}
        onChange={onChange}
        insertSubmit={insertSubmit}
        updateName={updateInputs.name}
        onUpdateChange={onUpdateChange}
      ></Program>
    </Container>
  );
}

export default ProgramContainer;
