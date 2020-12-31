import React from "react";
import styled from "styled-components";
import Dialog from "./Dialog";
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

const Wrapper = styled.div`
  height: auto;
  padding: 2rem;
  padding-top: 10em;
`;
const TitleContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 0 0 3em 0;
  border-bottom: solid 2px rgba(210, 215, 217, 0.75);
`;

const CreateContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 0 0 5em 0;
  padding: 0 0 5em 0;
  border-bottom: solid 2px rgba(210, 215, 217, 0.75);
`;

const ListContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0 0 5em 0;
  border-bottom: solid 2px rgba(210, 215, 217, 0.75);
`;

const Title = styled.h1`
  text-align: left;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1em 0;
  padding: 0 0.75em 1em 0;
  border-bottom: solid 3px #f56a6a;
`;

const Description = styled.p`
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 2em 0;
  padding: 0 0.75em 0.5em 0;
`;

const SubTitle = styled.h1`
  border-bottom: solid 3px #f56a6a;
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 1em 0;
  padding: 0 0.75em 0.5em 0;
`;

const InsertForm = styled.form`
  /* background: #f8f9fa; */
  /* padding: 32px; */
  /* padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-bottom: 1px solid #e9ecef; */
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #dee2e6;

  width: 100%;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;

  & + & {
    margin-top: 1rem;
  }
`;

const CreateButton = styled.button`
  margin-top: 1rem;
  width: 100%;
  height: 3rem;
  border-radius: 5px;
  background: #343a40;
  cursor: pointer;
  border: none;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 0.75rem;

  &:hover {
    background: #495057;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  width: 70%;
  background: #343a40;
  cursor: pointer;
  border: none;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem;

  &:hover {
    background: #495057;
  }
`;

function Class({
  building,
  classroomList,
  setBuildingTarget,
  buildingTarget,
  classroomTarget,
  setClassroomTarget,
  createOnChange,
  className,
  insertClass,
  classList,
  targetId,
  dialogDelete,
  onDeleteClick,
  updateClassName,
  onDeleteCancel,
  onDelete,
  updateOnChange
}) {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>수업 관리</Title>
        <Description>수업을 추가/수정하고 관리합니다.</Description>
      </TitleContainer>
      <CreateContainer>
        <SubTitle>수업 생성</SubTitle>
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
            건물 선택
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            style={{
              background: "#fff"
            }}
            onChange={setBuildingTarget}
            value={buildingTarget || "default"}
          >
            <MenuItem value="default">
              <em>건물을 선택해주세요.</em>
            </MenuItem>
            {building &&
              building.map(item => (
                <MenuItem key={item._id} name="insert" value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

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
            강의실 선택
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            style={{
              background: "#fff"
            }}
            value={classroomTarget || "default"}
            onChange={setClassroomTarget}
          >
            <MenuItem value="default">
              <em>강의실을 선택해주세요.</em>
            </MenuItem>
            {classroomList &&
              classroomList.map(item => (
                <MenuItem key={item._id} name="insert" value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <InsertForm>
          <Input
            name="className"
            value={className}
            onChange={createOnChange}
            placeholder="수업명을 입력해주세요."
          ></Input>
          <CreateButton onClick={insertClass}>생성</CreateButton>
        </InsertForm>
      </CreateContainer>
      <ListContainer>
        <SubTitle>수업 목록</SubTitle>

        <TableContainer component={Paper}>
          <Table style={{ minWidth: "360px" }} aria-label="building table">
            <TableHead style={{ background: "#f56a6a" }}>
              <TableRow>
                <TableCell style={{ color: "white" }} align="center">
                  번호
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  수업명
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  건물명
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  강의실명
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  담당자
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  삭제
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {classList &&
                classList.map((item, count) => (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="row" align="center">
                      {count + 1}
                    </TableCell>
                    <TableCell align="center">{item.name}</TableCell>

                    <TableCell align="center">
                      {item.buildingId[0] && item.buildingId[0].name}
                    </TableCell>
                    <TableCell align="center">
                      {item.classRoomId[0] && item.classRoomId[0].name}
                    </TableCell>
                    <TableCell align="center">
                      {item.userId[0].username}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={onDeleteClick} data-index={item._id}>
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ListContainer>
      <Dialog
        visible={dialogDelete}
        onConfirm={onDelete}
        onCancel={onDeleteCancel}
        cancelText="취소"
        confrimText="삭제"
        title="삭제하기"
        error="null"
        isEdit={false}
        updateInputs={updateClassName}
        onChange={updateOnChange}
      >
        정말로 삭제하시겠습니까?
      </Dialog>
      {/* <Dialog
        visible={dialogEdit}
        onConfirm={onEdit}
        onCancel={onEditCancel}
        cancelText="취소"
        confrimText="수정"
        title="수정하기"
        error="null"
        isEdit={true}
        updateInputs={updateClassName}
        onChange={updateOnChange}
      >
        정말로 수정하시겠습니까?
      </Dialog> */}
    </Wrapper>
  );
}

export default Class;
