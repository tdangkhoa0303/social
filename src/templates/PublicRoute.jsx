import React, { Fragment } from "react";
import { PublicAppBar } from "../components/AppBar";

function PrivateRoute({ Component }) {
  return (
    <Fragment>
      <PublicAppBar />
      <Component />
    </Fragment>
  );
}

export default PrivateRoute;
