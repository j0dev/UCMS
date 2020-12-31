import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import UserManage from "../components/Student/UserManage";
import { useDispatch, useSelector } from "react-redux";
import {
  getClass,
  changeUserTarget,
  insertUserClass
} from "../store/modules/computer";
import { getUserList } from "../store/modules/userManage";
import {
  getActiveUser,
  getNotActiveUser,
  activeUser,
  deleteUser
} from "../store/modules/home";

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

function StudentContainer() {
  const dispatch = useDispatch();
  const classList = useSelector(state => state.computer.classList);
  const userList = useSelector(state => state.userManage.userList);
  const target = useSelector(state => state.computer.target);

  const activeUsers = useSelector(state => state.home.activeUsers);
  const notActiveUsers = useSelector(state => state.home.notActiveUsers);

  const [dialogEdit, setDialogEdit] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [targetName, setTargetName] = useState("");

  const onUserActive = useCallback(
    async e => {
      e.preventDefault();
      const _id = e.target.dataset.index;
      await dispatch(activeUser(_id));
      await dispatch(getActiveUser());
      await dispatch(getNotActiveUser());
    },
    [dispatch]
  );

  const onUserDelete = useCallback(
    async e => {
      e.preventDefault();
      const _id = e.target.dataset.index;
      await dispatch(deleteUser(_id));
      await dispatch(getActiveUser());
      await dispatch(getNotActiveUser());
    },
    [dispatch]
  );

  const onEditClick = e => {
    const _id = e.target.dataset.index;

    console.log(_id);
    const value = e.target.dataset.value;
    console.log(value);
    setDialogEdit(true);
  };

  const onEditCancel = () => {
    setTargetId("");
    setTargetName("");
    setDialogEdit(false);
  };

  useEffect(() => {
    if (classList === null) {
      dispatch(getClass());
      console.log(classList);
    }

    if (userList === null) {
      dispatch(getUserList());
    }

    if (activeUsers === null) {
      dispatch(getActiveUser());
    }
    if (notActiveUsers === null) {
      dispatch(getNotActiveUser());
    }
  }, [activeUsers, classList, dispatch, notActiveUsers, userList]);

  const onDetail = e => {
    const _id = e.target.dataset.index;
    const name = e.target.dataset.name;

    setTargetId(_id);
    setTargetName(name);

    setDialogEdit(true);
  };

  const targetOnChange = e => {
    const value = e.target.value;
    dispatch(changeUserTarget(value));
  };

  const onPlus = useCallback(
    async e => {
      e.preventDefault();
      await dispatch(insertUserClass(targetId, target));
      await dispatch(getClass());
      await onEditCancel();
    },
    [dispatch, target, targetId]
  );

  return (
    <Container>
      <UserManage
        classList={classList}
        onDetail={onDetail}
        onClick={onEditClick}
        activeUsers={activeUsers}
        notActiveUsers={notActiveUsers}
        onUserActive={onUserActive}
        onUserDelete={onUserDelete}
      ></UserManage>
    </Container>
  );
}

export default StudentContainer;
