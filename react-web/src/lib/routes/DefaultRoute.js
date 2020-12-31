import React from "react";
import { Redirect, Route } from "react-router-dom";

// import { check } from "../store/modules/user";
// import { connect } from "react-redux";
import { ACCESS_TOKEN } from "../config";

// const mapStateToProps = ({ user }) => ({
//   user: user.user,
// });

export const DefaultRoute = ({ getComponent: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const jwt = localStorage.getItem(ACCESS_TOKEN);
      if (jwt) {
        return <Redirect to="/home" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

// export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
