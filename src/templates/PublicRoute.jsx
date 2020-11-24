import React, { Fragment, useContext } from "react";
import { PublicAppBar } from "../components/AppBar";

import Context from "../Context";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "80px",
  },
}));

function PrivateRoute({ Component }) {
  const {
    auth: { isAuth },
  } = useContext(Context);

  const classes = useStyles();

  return (
    <Fragment>
      {isAuth ? (
        <Box className={classes.root}>
          <PublicAppBar />
          <Component />
        </Box>
      ) : (
        <Redirect to="/" />
      )}
    </Fragment>
  );
}

export default PrivateRoute;
