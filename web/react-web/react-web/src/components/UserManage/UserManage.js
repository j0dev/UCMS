import React from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
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

const ListContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 2rem;
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

function UserManage({
  classList,
  onDetail,
  activeUsers,
  notActiveUsers,
  onUserActive,
  onUserDelete
}) {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>사용자 관리</Title>
        <Description>원하는 수업에 조교를 추가할 수 있습니다.</Description>
      </TitleContainer>

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
                  담당자
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  관리
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
                      {item.userId.map(list => (
                        <p>{list.username}</p>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        data-index={item._id}
                        data-name={item.name}
                        data-list={item.userId}
                        onClick={onDetail}
                      >
                        관리
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ListContainer>
    </Wrapper>
  );
}

export default UserManage;
