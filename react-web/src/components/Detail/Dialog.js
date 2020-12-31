import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { MdRefresh } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import Loading from "./Loading";

const RefreshBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.div`
  flex: 1;
  text-align: left;
`;

const RefreshDiv = styled.div`
  flex: 1;
  text-align: right;
`;

const ListContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0 0 5em 0;
  border-bottom: solid 2px rgba(210, 215, 217, 0.75);
`;

const SubTitle = styled.h1`
  border-bottom: solid 3px #f56a6a;
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 2rem 0 1rem 0;
  padding: 0 0.75em 0.5em 0;
`;
const Input = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #dee2e6;

  width: 100%;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(200px);
    }
    to {
        transform: translateY(0px);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(200px);
    }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  ${props =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  width: auto;
  max-height: 680px;
  overflow: scroll;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  ${props =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: scroll;
    display: inline-block;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  background: #343a40;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2.25rem;
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
`;

function Dialog({
  targetPcNumber,
  detail,
  dialogVisible,
  onVisibleCancel,
  OrderList,
  orderTarget,
  onChangeOrderTarget,
  sendOrder,
  onSecondChange,
  second,
  getLoading,
  onRefresh,
  onDeleteComputer
}) {
  console.log("orderlist", OrderList);
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(dialogVisible);
  useEffect(() => {
    if (localVisible && !dialogVisible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(dialogVisible);
  }, [localVisible, dialogVisible]);

  if (!localVisible && !animate) return null;
  console.log("detail", detail);

  let targetList = {};
  if (detail) {
    detail.computerId.map(item =>
      Number(item.pcNumber) === Number(targetPcNumber)
        ? (targetList = item)
        : ""
    );
  }
  const pcMac = targetList.mac;

  if (targetList.createdAt) {
    return (
      <DarkBackground disappear={!dialogVisible}>
        <DialogBlock disappear={!dialogVisible}>
          <ButtonGroup>
            <ShortMarginButton
              onClick={onDeleteComputer}
              data-index={pcMac}
              color="gray"
            >
              PC 삭제
            </ShortMarginButton>
            <ShortMarginButton
              onClick={sendOrder}
              data-index={pcMac}
              color="gray"
            >
              명령 전송
            </ShortMarginButton>
            <ShortMarginButton onClick={onVisibleCancel} color="pink">
              닫기
            </ShortMarginButton>
          </ButtonGroup>

          <RefreshBlock>
            <TitleDiv>
              <SubTitle>명령 선택</SubTitle>
            </TitleDiv>
            <RefreshDiv>
              <MdRefresh
                onClick={onRefresh}
                cursor="pointer"
                size="2rem"
                color="green"
              ></MdRefresh>
            </RefreshDiv>
          </RefreshBlock>

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
              명령 선택
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
                <em>명령을 선택해주세요.</em>
              </MenuItem>

              {OrderList.map(item => (
                <MenuItem key={item.idx} name="insert" value={item.command}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {orderTarget && orderTarget === "lock" && <div>lock</div>}
          {orderTarget && orderTarget === "lockSecond" && (
            <Input
              onChange={onSecondChange}
              name="second"
              value={second}
              placeholder="초 입력"
            ></Input>
          )}

          {getLoading ? (
            <Loading color="#000"></Loading>
          ) : (
            <ListContainer>
              <SubTitle>기본 정보</SubTitle>
              <TableContainer component={Paper}>
                <Table aria-label="building table">
                  <TableHead style={{ background: "#f56a6a" }}>
                    <TableRow>
                      <TableCell style={{ color: "white" }} align="center">
                        분류
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        내용
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        PC 번호
                      </TableCell>
                      <TableCell align="center">{targetPcNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        MAC
                      </TableCell>
                      <TableCell align="center">{targetList.mac}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        IP
                      </TableCell>
                      <TableCell align="center">{targetList.ip}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        등록일
                      </TableCell>
                      <TableCell align="center">
                        {targetList.createdAt}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        전원 상태
                      </TableCell>
                      <TableCell align="center">
                        {targetList.isPower ? <>ON</> : <>OFF</>}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        잠김 상태
                      </TableCell>
                      <TableCell align="center">
                        {targetList.isLock ? <>ON</> : <>OFF</>}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <SubTitle>설치 프로그램 정보</SubTitle>
              <TableContainer>
                <Table
                  style={{ minWidth: "360px" }}
                  aria-label="building table"
                >
                  <TableHead style={{ background: "#f56a6a" }}>
                    <TableRow>
                      <TableCell style={{ color: "white" }} align="center">
                        IDX
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        프로그램명
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {targetList.programList.length === 0 ? (
                      <TableRow key="0"></TableRow>
                    ) : (
                      targetList.programList.map((item, count) => (
                        <TableRow key={count + 1}>
                          <TableCell component="th" scope="row" align="center">
                            {count + 1}
                          </TableCell>
                          <TableCell align="center">{item.name}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <SubTitle>시작 프로그램 정보</SubTitle>
              <TableContainer>
                <Table
                  style={{ minWidth: "360px" }}
                  aria-label="building table"
                >
                  <TableHead style={{ background: "#f56a6a" }}>
                    <TableRow>
                      <TableCell style={{ color: "white" }} align="center">
                        IDX
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        프로그램명
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {targetList.startProgramList.length === 0 ? (
                      <TableRow key="0"></TableRow>
                    ) : (
                      targetList.startProgramList.map((item, count) => (
                        <TableRow key={count + 1}>
                          <TableCell component="th" scope="row" align="center">
                            {count + 1}
                          </TableCell>
                          <TableCell align="center">{item.name}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </ListContainer>
          )}
        </DialogBlock>
      </DarkBackground>
    );
  }
  return (
    <DarkBackground disappear={!dialogVisible}>
      <DialogBlock disappear={!dialogVisible}>
        <h3>PC 상태</h3>
        <h3>미동록</h3>
        <ButtonGroup>
          <ShortMarginButton onClick={onVisibleCancel} color="pink">
            닫기
          </ShortMarginButton>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}
export default Dialog;
