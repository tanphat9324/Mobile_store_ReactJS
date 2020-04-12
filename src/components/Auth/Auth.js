/* eslint-disable no-mixed-operators */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../utils";
const Auth = ({ path, Component }) => {
  return (
    <Route
      path={path}
      render={(routeProps) => {
        let path = routeProps.location.pathname;
        if (isLogin() && path === "/productadd" || !isLogin() && path === '/login') {
          return <Component {...routeProps} />;
        }
        if (isLogin() && path === "/login") {
          return <Redirect to="/productadd" />;
        }
         return <Redirect to="/login" />;
      }}
    />
  );
};
export default Auth;
