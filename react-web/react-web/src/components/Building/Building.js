import React from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import BuildingDialog from "./BuildingDialog";
import Loading from "./Loading";
import Error from "./Error";

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

function Building({
  dialogEdit,
  onEditClick,
  onEdit,
  onEditCancel,
  dialogDelete,
  onDeleteClick,
  onDelete,
  onDeleteCancel,
  building,
  getLoading,
  insertLoading,
  name,
  onChange,
  insertSubmit,
  error,
  updateName,
  onUpdateChange,
}) {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>건물 관리</Title>
        <Description>건물을 추가/수정하고 관리합니다.</Description>
      </TitleContainer>
      <CreateContainer>
        <SubTitle>건물 생성</SubTitle>
        <InsertForm>
          <Input
            name="name"
            placeholder="건물명을 입력해주세요."
            value={name}
            onChange={onChange}
          ></Input>
          <CreateButton onClick={insertSubmit}>생성</CreateButton>
          {insertLoading && <Loading></Loading>}
          {!insertLoading && error.type === "insert" && (
            <Error>{error.description}</Error>
          )}
        </InsertForm>
      </CreateContainer>
      <ListContainer>
        <SubTitle>건물 목록</SubTitle>
        <TableContainer component={Paper}>
          <Table style={{ minWidth: "360px" }} aria-label="building table">
            <TableHead style={{ background: "#f56a6a" }}>
              <TableRow>
                <TableCell style={{ color: "white" }} align="center">
                  번호
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  건물명
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  수정
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  삭제
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {building &&
                error.type !== "get" &&
                !getLoading &&
                building.map((item, count) => (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="row" align="center">
                      {count + 1}
                    </TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={onEditClick}
                        data-index={item._id}
                        data-value={item.name}
                      >
                        수정
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={onDeleteClick} data-index={item._id}>
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {error.type && error.type !== "insert" && (
            <Error>{error.description}</Error>
          )}
          {getLoading && <Loading></Loading>}
        </TableContainer>
      </ListContainer>

      <BuildingDialog
        visible={dialogDelete}
        onConfirm={onDelete}
        onCancel={onDeleteCancel}
        cancelText="취소"
        confrimText="삭제"
        title="삭제하기"
        error={error}
        isEdit={false}
        value={updateName}
        onUpdateChange={onUpdateChange}
      >
        정말로 삭제하시겠습니까?
      </BuildingDialog>
      <BuildingDialog
        visible={dialogEdit}
        onConfirm={onEdit}
        onCancel={onEditCancel}
        cancelText="취소"
        confrimText="수정"
        title="수정하기"
        error={error}
        isEdit={true}
        value={updateName}
        onUpdateChange={onUpdateChange}
      >
        정말로 수정하시겠습니까?
      </BuildingDialog>
    </Wrapper>
  );
}

export default Building;
