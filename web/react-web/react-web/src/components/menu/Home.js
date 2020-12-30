import React from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import Loading from "./Loading";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Wrapper = styled.div`
  height: auto;
  padding: 2rem;
  padding-top: 10em;
`;
const TitleContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 3rem 3rem 3em 0;
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

const SubTitle = styled.h1`
  border-bottom: solid 3px #f56a6a;
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 1em 0;
  padding: 0 0.75em 0.5em 0;
`;

const CreateContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: scroll;
  margin: 0 0 5em 0;
  padding: 0 0 5em 0;
  border-bottom: solid 2px rgba(210, 215, 217, 0.75);
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

function Home({
  building,
  classroomList,
  setBuildingTarget,
  setClassroomTarget,
  buildingTarget,
  classroomTarget,
  detail,
  install,
  getLoading,
  onClick
}) {
  let comCount = 0;
  let enrolledCount = 0;
  let onPower = 0;
  let offPower = 0;
  let data = [];
  let installList = [];

  if (detail) {
    comCount = detail.comCount;
    detail.computerId.map(item =>
      item.isPower === true ? (onPower += 1) : (offPower += 1)
    );

    detail.computerId.map(
      item =>
        item.programList &&
        item.programList.map(list =>
          installList.push({
            pcId: item._id,
            name: list.name,
            pcNumber: item.pcNumber,
            classRoomId: item.classRoomId[0]
          })
        )
    );
    enrolledCount = onPower + offPower;
    data = [
      { name: "전체 컴퓨터 수", count: comCount, pv: 2400, amt: 2400 },
      { name: "등록된 컴퓨터 수", count: enrolledCount, pv: 2400, amt: 2400 },
      { name: "전원 ON", count: onPower, pv: 2400, amt: 2400 },
      { name: "전원 OFF", count: offPower, pv: 2400, amt: 2400 }
    ];
  }

  if (installList && install) {
    install.map(list =>
      installList.map(item =>
        String(list.name) === String(item.name)
          ? installList.splice(installList.indexOf(item), 1)
          : // console.log(installList.indexOf(list))
            // ? console.log
            ""
      )
    );
  }
  console.log("chieck", installList);

  //   detail ? () : "";
  // classroomList &&
  // classroomList.map(
  //   item => item._id === classroomTarget && (comCount = item.comCount)
  // );
  console.log("loading", getLoading);

  return (
    <Wrapper>
      <CreateContainer>
        <SubTitle>PC 상태</SubTitle>
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

        {!getLoading ? (
          detail && (
            <>
              <TitleContainer>
                <Title>PC 전원 상태</Title>
              </TitleContainer>
              <TableContainer>
                <BarChart width={600} height={300} data={data}>
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Bar dataKey="count" fill="#8884d8" barSize={30} />
                </BarChart>
              </TableContainer>
              <CreateButton onClick={onClick} data-index={detail._id}>
                PC 관리
              </CreateButton>
              <TitleContainer>
                <Title>비인가 프로그램 설치 상황</Title>
              </TitleContainer>
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
                      <TableCell style={{ color: "white" }} align="center">
                        PC 번호
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {installList.length === 0 ? (
                      <TableRow key="0"></TableRow>
                    ) : (
                      installList.map((item, count) => (
                        <TableRow key={count + 1}>
                          <TableCell component="th" scope="row" align="center">
                            {count + 1}
                          </TableCell>
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="center">{item.pcNumber}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )
        ) : (
          <Loading color="#000"></Loading>
        )}
      </CreateContainer>
    </Wrapper>
  );
}

export default Home;
