import React from "react";
import styled, { css } from "styled-components";
import { MdBrightness1, MdClose, MdRefresh } from "react-icons/md";
import Loading from "./Loading";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: rgb(52, 58, 64);
  flex-direction: column;
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  text-align: center;
  color: black;
  font-weight: bold;
  background: #fff;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2.25rem;
  justify-content: center;

  line-height: 2rem;
  font-size: 1rem;
  & + & {
    margin-left: 1rem;
  }
`;
const ShortMarginButton = styled(StyledButton)`
  & + & {
    margin-left: 0.5rem;
  }
  text-align: center;
`;

const CloseBlock = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 1rem;
  cursor: pointer;
`;
const ButtonGroup = styled.div`
  padding: 0 2rem 0 2rem;
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;
const Wrapper = styled.div`
  padding: 0 2rem 0 2rem;
`;
const ComputerWrapper = styled.div`
  padding: 0 2rem 0 2rem;
  display: frex;
  flex-direction: row;
  & + & {
    margin-top: 2rem;
  }
`;
const ExplainArea = styled.div`
  padding-top: 5rem;
  margin-bottom: 3rem;
`;
const ComputerArea = styled.div`
  padding-top: 2rem;
  margin-bottom: 2rem;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: auto;
  /* border-bottom: solid 2px rgba(210, 215, 217, 0.75); */
`;

const Title = styled.h1`
  text-align: left;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1em 0;
  padding: 0 0.75em 1em 0;
  color: #fff;
  border-bottom: solid 3px #f56a6a;
`;

const ComputerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  background-color: rgba(210, 215, 217, 0.75);
  flex-grow: 1;
  width: 3rem;
  height: 3rem;
  & + & {
    margin-left: 1rem;
  }
  cursor: pointer;

  ${props =>
    props.isPower &&
    props.mac &&
    css`
      background-color: green;
    `}

  ${props =>
    props.mac &&
    !props.isPower &&
    css`
      background-color: red;
    `}

    ${props =>
      props.isView === "x" &&
      css`
        background-color: rgb(52, 58, 64);
        color: rgb(52, 58, 64);
      `}
`;

const PowerStatus = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

function Detail({
  targetPcNumber,
  detail,
  dialogVisible,
  onVisible,
  onVisibleCancel,
  onClose,
  onRefresh,
  getLoading,
  onChangeOrderTarget,
  orderTarget,
  OrderList,
  sendClassOrder
}) {
  const row = detail.row;
  const col = detail.col;
  const comCount = detail.comCount;
  console.log(row, col, comCount);

  let tmpData = [];
  let pcList = [];
  let isEnroll = false;
  // for (let i = 1; i <= comCount; i++) {
  for (let i = 1; i <= Number(row * col); i++) {
    detail.computerId.map(item =>
      item.pcNumber === i && tmpData.push(item) ? (isEnroll = true) : ""
    );

    if (isEnroll === false) {
      if (i > comCount) {
        tmpData.push({ pcNumber: "x" });
      } else {
        tmpData.push({ pcNumber: i });
      }
    } else {
      isEnroll = false;
    }

    // console.log("this si prev tmp ", tmpData);
    if (i % row === 0) {
      // console.log(i);
      pcList.push(tmpData);
      tmpData = [];
    }
  }
  pcList.push(tmpData);
  tmpData = [];

  console.log("tmp", tmpData);
  console.log("pclist", pcList);

  return (
    <>
      <Container>
        <CloseBlock onClick={onClose}>
          <MdClose size="3rem" color="#fff"></MdClose>
        </CloseBlock>
        <ExplainArea>
          <Wrapper>
            <TitleContainer>
              <Title>강의실 : {detail.name}</Title>
            </TitleContainer>
            <PowerStatus>
              <MdBrightness1 color="green"></MdBrightness1>전원 켜짐
              <MdBrightness1 color="red"></MdBrightness1>전원 꺼짐
              <MdBrightness1 color="rgba(210, 215, 217, 0.75)"></MdBrightness1>
              PC 미등록
              <MdRefresh
                onClick={onRefresh}
                cursor="pointer"
                size="2rem"
                color="green"
              ></MdRefresh>
            </PowerStatus>
          </Wrapper>
        </ExplainArea>

        <ButtonGroup>
          <FormControl
            variant="filled"
            style={{
              width: "100%",
              background: "#fff",
              border: "1px solid #dee2e6",
              marginBottom: "1rem",
              borderRadius: "5px"
            }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              전체 명령 선택
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              style={{
                background: "#fff"
              }}
              onChange={onChangeOrderTarget}
              value={orderTarget || "default"}
            >
              <MenuItem value="default">
                <em>전체 명령을 선택해주세요.</em>
              </MenuItem>

              {OrderList.map(item => (
                <MenuItem key={item.idx} name="insert" value={item.command}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ButtonGroup>
        <ButtonGroup>
          <ShortMarginButton
            onClick={sendClassOrder}
            // data-index={pcMac}
            color="gray"
          >
            명령 전송
          </ShortMarginButton>
        </ButtonGroup>
        {getLoading ? (
          <Loading></Loading>
        ) : (
          <ComputerArea>
            {pcList &&
              pcList.map((item, count) => (
                <ComputerWrapper key={count}>
                  {item.map(list => (
                    <ComputerBox
                      key={list.pcNumber}
                      onClick={onVisible}
                      isPower={list.isPower}
                      mac={list.mac}
                      data-index={list.pcNumber}
                      isView={list.pcNumber}
                    >
                      {list.pcNumber}
                    </ComputerBox>
                  ))}
                </ComputerWrapper>
              ))}
          </ComputerArea>
        )}
      </Container>
    </>
  );
}

export default Detail;
