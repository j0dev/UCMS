import React, { useEffect } from "react";
import styled from "styled-components";
import Computer from "../components/Computer/Computer";
import { useDispatch, useSelector } from "react-redux";
import { getClass } from "../store/modules/computer";
import { useHistory } from "react-router-dom";

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

function ComputerContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classList = useSelector(state => state.computer.classList);

  useEffect(() => {
    if (classList === null) {
      dispatch(getClass());
      console.log(classList);
    }
  }, [classList, dispatch]);

  const onDetail = e => {
    const classRoomId = e.target.dataset.index;

    history.push("/computer/detail/" + classRoomId);
  };

  return (
    <Container>
      <Computer classList={classList} onDetail={onDetail}></Computer>
    </Container>
  );
}

export default ComputerContainer;
