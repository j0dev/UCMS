import React from "react";
import { Redirect, Route } from "react-router-dom";

import { ACCESS_TOKEN } from "../config";

export const PrivateRoute = ({ getComponent: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const jwt = localStorage.getItem(ACCESS_TOKEN);

      //   loadUser();
      if (!jwt) {
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);
