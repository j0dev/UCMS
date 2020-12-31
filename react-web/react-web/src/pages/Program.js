import React from "react";

import MenuContainer from "../containers/MenuContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { useDispatch } from "react-redux";
import { initMenu, changeActive } from "../store/modules/menu";
import Footer from "../components/Footer";
import ProgramContainer from "../containers/ProgramContainer";

function Program() {
  const dispatch = useDispatch();
  const navActive = "program";
  dispatch(initMenu());
  dispatch(changeActive(navActive));
  window.scrollTo(0, 0);

  return (
    <>
      <HeaderContainer></HeaderContainer>
      <div>
        <MenuContainer></MenuContainer>
        <ProgramContainer></ProgramContainer>
      </div>
      <Footer background="#fff"></Footer>
    </>
  );
}

export default Program;
