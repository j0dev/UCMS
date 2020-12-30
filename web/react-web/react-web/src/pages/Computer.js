import React from "react";
import MenuContainer from "../containers/MenuContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { useDispatch } from "react-redux";
import { initMenu, changeActive } from "../store/modules/menu";
import ComputerContainer from "../containers/ComputerContainer";

function Computer() {
  const dispatch = useDispatch();
  const navActive = "computer";
  dispatch(initMenu());
  dispatch(changeActive(navActive));
  window.scrollTo(0, 0);
  return (
    <div>
      <HeaderContainer></HeaderContainer>
      <MenuContainer></MenuContainer>
      <ComputerContainer></ComputerContainer>
    </div>
  );
}

export default Computer;
