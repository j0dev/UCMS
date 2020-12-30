import React from "react";
import BuildingContainer from "../containers/BuildingContainer";
import MenuContainer from "../containers/MenuContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { useDispatch } from "react-redux";
import { initMenu, changeActive } from "../store/modules/menu";
import Footer from "../components/Footer";

function Building() {
  const dispatch = useDispatch();
  const navActive = "building";
  dispatch(initMenu());
  dispatch(changeActive(navActive));
  window.scrollTo(0, 0);

  return (
    <>
      <HeaderContainer></HeaderContainer>
      <div>
        <MenuContainer></MenuContainer>
        <BuildingContainer></BuildingContainer>
      </div>
      <Footer background="#fff"></Footer>
    </>
  );
}

export default Building;
