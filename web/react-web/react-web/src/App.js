import React from "react";
// import { Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { PrivateRoute } from "./lib/routes/PrivateRoute";
import Home from "./pages/Home";
import { DefaultRoute } from "./lib/routes/DefaultRoute";
import Building from "./pages/Building";
import Classroom from "./pages/Classroom";
import Class from "./pages/Class";
import Computer from "./pages/Computer";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import Program from "./pages/Program";
import UserManage from "./pages/UserManage";
import Student from "./pages/Student";

const DefaultComponent = createGlobalStyle`
${reset};
  body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size:10px;
  }
  a {
    text-decoration: none;
  }
`;

function App({ getComponent }) {
  return (
    <>
      <DefaultComponent />
      <DefaultRoute exact path="/" getComponent={Login} />
      <PrivateRoute exact path="/program" getComponent={Program} />
      <PrivateRoute exact path="/user" getComponent={UserManage} />
      <PrivateRoute exact path="/student" getComponent={Student} />
      <DefaultRoute exact path="/login" getComponent={Login} />
      <DefaultRoute exact path="/register" getComponent={Register} />
      <PrivateRoute exact path="/home" getComponent={Home}></PrivateRoute>
      <PrivateRoute
        exact
        path="/building"
        getComponent={Building}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/classroom"
        getComponent={Classroom}
      ></PrivateRoute>
      <PrivateRoute exact path="/class" getComponent={Class}></PrivateRoute>
      <PrivateRoute
        exact
        path="/computer"
        getComponent={Computer}
      ></PrivateRoute>
      <PrivateRoute
        path="/computer/detail/:classRoomId"
        getComponent={Detail}
      ></PrivateRoute>
    </>
  );
}

export default App;
