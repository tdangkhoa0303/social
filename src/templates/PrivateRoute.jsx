import React, { useContext, Fragment } from "react";

import { Redirect } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

import { PrivateAppBar } from "../components/AppBar";

function PrivateRoute({ Component }) {
  const {
    auth: { isAuth },
  } = useContext(AuthContext);

  return (
    <Fragment>
      {isAuth !== null &&
        (isAuth ? (
          <Fragment>
            <PrivateAppBar />
            <Component />
          </Fragment>
        ) : (
          <Redirect to="/signIn" />
        ))}
    </Fragment>
  );
}

export default PrivateRoute;
