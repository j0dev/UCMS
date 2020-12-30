import React from "react";
import Nav from "../components/menu/Nav";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/modules/user";
import { useHistory } from "react-router-dom";
import { chagneMenu } from "../store/modules/menu";

var navList = [
  { id: "home", label: "HOME", path: "/home" },
  { id: "program", label: "프로그램 관리", path: "/program" },
  { id: "user", label: "사용자 관리", path: "/user" },
  { id: "student", label: "조교 관리", path: "/student" },
  { id: "building", label: "건물 관리", path: "/building" },
  { id: "classroom", label: "강의실 관리", path: "/classroom" },
  { id: "class", label: "수업 관리", path: "/class" },
  { id: "computer", label: "PC 관리", path: "/computer" }
];

var navProfessorList = [
  { id: "home", label: "HOME", path: "/home" },
  { id: "student", label: "조교 관리", path: "/student" },
  { id: "class", label: "수업 관리", path: "/class" },
  { id: "computer", label: "PC 관리", path: "/computer" }
];

var navStudentList = [
  { id: "home", label: "HOME", path: "/home" },
  { id: "computer", label: "PC 관리", path: "/computer" }
];

function MenuContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutBtn = () => {
    dispatch(logout());
    history.push("/");
  };

  const user = useSelector(state => state.user.user);

  if (user) {
    if (user.type === 1) {
    }
  }
  console.log(12341234234, user);
  const isClose = useSelector(state => state.menu.isClose);
  const active = useSelector(state => state.menu.active);

  const isBackGround = () => {
    dispatch(chagneMenu());
  };

  return (
    <>
      {user && user.type === 0 && (
        <Nav
          isClose={isClose}
          navList={navList}
          logoutBtn={logoutBtn}
          active={active.navActive}
          isBackGround={isBackGround}
        ></Nav>
      )}
      {user && user.type === 1 && (
        <Nav
          isClose={isClose}
          navList={navProfessorList}
          logoutBtn={logoutBtn}
          active={active.navActive}
          isBackGround={isBackGround}
        ></Nav>
      )}
      {user && user.type === 2 && (
        <Nav
          isClose={isClose}
          navList={navStudentList}
          logoutBtn={logoutBtn}
          active={active.navActive}
          isBackGround={isBackGround}
        ></Nav>
      )}
    </>
  );
}

export default MenuContainer;
