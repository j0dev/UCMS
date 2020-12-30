import React from "react";
import Header from "../components/menu/Header";
import { chagneMenu } from "../store/modules/menu";
import { useDispatch } from "react-redux";

// var navList = [
//   { id: "main", label: "MAIHN", path: "/main" },
//   { id: "user", label: "사용자 관리", path: "/user" },
//   { id: "building", label: "건물 관리", path: "/building" },
// ];

function HeaderContainer() {
  const dispatch = useDispatch();

  const isMenu = () => {
    dispatch(chagneMenu());
  };

  return <Header isMenu={isMenu}></Header>;
}

export default HeaderContainer;
