import React, { useContext, Fragment } from "react";

import { Redirect } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

import { PublicAppBar } from "../components/AppBar";

function PrivateRoute({ Component }) {
  const {
    auth: { isAuth },
  } = useContext(AuthContext);

  return (
    <Fragment>
      <PublicAppBar />
      <Component />
    </Fragment>
  );
}

export default PrivateRoute;
