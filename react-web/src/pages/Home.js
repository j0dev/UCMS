import React from "react";
import MenuContainer from "../containers/MenuContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { useDispatch } from "react-redux";
import { initMenu, changeActive } from "../store/modules/menu";
import HomeContainer from "../containers/HomeContainer";

function Home() {
  const dispatch = useDispatch();
  const navActive = "home";
  dispatch(initMenu());
  dispatch(changeActive(navActive));
  window.scrollTo(0, 0);
  return (
    <div>
      <HeaderContainer></HeaderContainer>
      <MenuContainer></MenuContainer>
      <HomeContainer></HomeContainer>
    </div>
  );
}

export default Home;
