import React from "react";
import MenuContainer from "../containers/MenuContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { useDispatch } from "react-redux";
import { initMenu, changeActive } from "../store/modules/menu";
import ClassroomContainer from "../containers/ClassroomContainer";

function Classroom() {
  const dispatch = useDispatch();
  const navActive = "classroom";
  dispatch(initMenu());
  dispatch(changeActive(navActive));
  window.scrollTo(0, 0);
  return (
    <div>
      <HeaderContainer></HeaderContainer>
      <MenuContainer></MenuContainer>
      <ClassroomContainer></ClassroomContainer>
    </div>
  );
}

export default Classroom;
