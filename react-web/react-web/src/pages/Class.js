import React from "react";
import MenuContainer from "../containers/MenuContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { useDispatch } from "react-redux";
import { initMenu, changeActive } from "../store/modules/menu";
import ClassContainer from "../containers/ClassContainer";

function Class() {
  const dispatch = useDispatch();
  const navActive = "class";
  dispatch(initMenu());
  dispatch(changeActive(navActive));
  window.scrollTo(0, 0);
  return (
    <div>
      <HeaderContainer></HeaderContainer>
      <MenuContainer></MenuContainer>
      <ClassContainer></ClassContainer>
    </div>
  );
}

export default Class;
