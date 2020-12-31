import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassroom,
  changeTarget,
  changeOrderTarget,
  postOrder,
  changeSecond,
  postLockSecondOrder,
  postClassLockSecondOrder,
  postClassOrder,
  deleteComputer
} from "../store/modules/computer";
import Detail from "../components/Detail/Detail";
import Dialog from "../components/Detail/Dialog";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: inline-block;

  height: 100%;
  min-height: 100%;
`;

function DetailContainer({ classRoomId }) {
  const OrderList = [
    {
      idx: 1,
      name: "PC 종료",
      command: "shutdown"
    },
    {
      idx: 2,
      name: "시작 프로그램 갱신",
      command: "startApplication"
    },
    {
      idx: 3,
      name: "설치 프로그램 갱신",
      command: "installedApplication"
    },
    {
      idx: 4,
      name: "PC 잠금 해제",
      command: "unLock"
    },
    {
      idx: 5,
      name: "PC 잠금 (초)",
      command: "lockSecond"
    }
  ];

  const history = useHistory();
  const dispatch = useDispatch();
  const { detail, targetClassroom, orderTarget, second } = useSelector(
    state => state.computer
  );

  if (classRoomId !== targetClassroom) {
    dispatch(changeTarget(classRoomId));
    dispatch(getClassroom(classRoomId));
  }

  const onRefresh = () => {
    dispatch(getClassroom(classRoomId));
  };

  const [dialogVisible, setDialogVisible] = useState(false);

  const [targetPcNumber, setTargetPcNumber] = useState(0);

  const onVisible = e => {
    const target = e.target.dataset.index;
    setTargetPcNumber(target);
    setDialogVisible(true);
  };
  const onVisibleCancel = () => {
    setDialogVisible(false);
  };

  const onDeleteComputer = useCallback(
    async e => {
      e.preventDefault();
      const pcMac = e.target.dataset.index;
      await dispatch(deleteComputer(pcMac));
      await dispatch(getClassroom(classRoomId));
    },
    [classRoomId, dispatch]
  );
  const onClose = () => {
    history.push("/computer/");
  };

  const onChangeOrderTarget = e => {
    const value = e.target.value;
    dispatch(changeOrderTarget(value));
  };

  const onSecondChange = e => {
    const value = e.target.value;
    dispatch(changeSecond(value));
  };

  const getLoading = useSelector(
    state => state.loading["computer/GET_CLASSROOM"]
  );

  const sendOrder = e => {
    const pcMac = e.target.dataset.index;

    if (orderTarget === "shutdown") {
      dispatch(postOrder(pcMac, orderTarget));
    } else if (orderTarget === "startApplication") {
      dispatch(postOrder(pcMac, orderTarget));
    } else if (orderTarget === "installedApplication") {
      dispatch(postOrder(pcMac, orderTarget));
    } else if (orderTarget === "unLock") {
      dispatch(postOrder(pcMac, orderTarget));
    } else if (orderTarget === "lock") {
    } else if (orderTarget === "lockSecond") {
      dispatch(postLockSecondOrder(pcMac, orderTarget, second));
    } else {
    }
    console.log(orderTarget, pcMac);
  };

  const sendClassOrder = e => {
    if (orderTarget === "shutdown") {
      dispatch(postClassOrder(classRoomId, orderTarget));
    } else if (orderTarget === "startApplication") {
      dispatch(postClassOrder(classRoomId, orderTarget));
    } else if (orderTarget === "installedApplication") {
      dispatch(postClassOrder(classRoomId, orderTarget));
    } else if (orderTarget === "unLock") {
      dispatch(postClassOrder(classRoomId, orderTarget));
    } else if (orderTarget === "lock") {
    } else if (orderTarget === "lockSecond") {
      dispatch(postClassLockSecondOrder(classRoomId, orderTarget, 3000));
    } else {
    }
    alert("명령 전송 완료");
  };

  if (detail) {
    return (
      <Container>
        <Detail
          targetPcNumber={targetPcNumber}
          detail={detail}
          dialogVisible={dialogVisible}
          onVisible={onVisible}
          onVisibleCancel={onVisibleCancel}
          onClose={onClose}
          onRefresh={onRefresh}
          getLoading={getLoading}
          onChangeOrderTarget={onChangeOrderTarget}
          orderTarget={orderTarget}
          OrderList={OrderList}
          sendClassOrder={sendClassOrder}
        ></Detail>
        <Dialog
          targetPcNumber={targetPcNumber}
          detail={detail}
          dialogVisible={dialogVisible}
          onVisibleCancel={onVisibleCancel}
          OrderList={OrderList}
          orderTarget={orderTarget}
          onChangeOrderTarget={onChangeOrderTarget}
          sendOrder={sendOrder}
          onSecondChange={onSecondChange}
          second={second}
          getLoading={getLoading}
          onRefresh={onRefresh}
          onDeleteComputer={onDeleteComputer}
        ></Dialog>
      </Container>
    );
  } else {
    return <></>;
  }
}

export default DetailContainer;
