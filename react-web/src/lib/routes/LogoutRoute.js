import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../store/modules/user";

const dispatch = useDispatch();
export const LogoutRoute = ({ ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      dispatch(logout());

      //   loadUser();

      return <Redirect to="/login" />;
    }}
  />
);
