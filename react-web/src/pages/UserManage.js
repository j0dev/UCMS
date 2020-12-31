import React from "react";
import MenuContainer from "../containers/MenuContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { useDispatch } from "react-redux";
import { initMenu, changeActive } from "../store/modules/menu";

import UserManageContainer from "../containers/UserManageContainer";
import StudentContainer from "../containers/StudentContainer";

function UserManage() {
  const dispatch = useDispatch();
  const navActive = "user";
  dispatch(initMenu());
  dispatch(changeActive(navActive));
  window.scrollTo(0, 0);
  return (
    <div>
      <HeaderContainer></HeaderContainer>
      <MenuContainer></MenuContainer>
      <StudentContainer></StudentContainer>
    </div>
  );
}

export default UserManage;
